import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../core/prisma";
import {UsersService} from "../users";
import {RegisterDto} from "./dto/register.dto";
import {forgotPassword, User} from "@prisma/client";
import {HashHelper} from "../../helpers/hash";
import {Utils} from "../../helpers/utils";
import {EmailExistedException, InvalidCredentialsException, TooManyRequestsException} from "./exception";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {LoginDto} from "./dto/login.dto";
import {TokenPayload} from "./tokenPayload.interface";
import {JwtService} from "@nestjs/jwt";
import * as process from "node:process";

@Injectable()
export class AuthService {
    constructor(
        private readonly db: PrismaService,
        private readonly userService: UsersService,
        private readonly jwt: JwtService
    ) {
    }

    async register(registerDto: RegisterDto): Promise<User> {
        const hashedPassword = await HashHelper.hash(registerDto.password);

        try {
            const user = await this.userService.create({
                ...registerDto,
                password: hashedPassword
            });

            return {
                ...user,
                password: null
            };
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === Utils.PrismaError.UniqueConstaintFailed) {
                throw new EmailExistedException();
            }
            throw error;
        }
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const foundUser = await this.userService.findByEmail(loginDto.email);

        const isValid = await HashHelper.verify(loginDto.password, foundUser.password);
        if (!isValid) {
            throw new InvalidCredentialsException();
        }

        const payload: TokenPayload = {
            userId: foundUser.id,
            fullName: foundUser.fullName,
            email: foundUser.email
        };
        const accessToken = this.createToken(payload);
        return {
            accessToken
        }
    }

    async forgotPassword(email: string): Promise<{ resetToken: string }> {
        const foundUser = await this.userService.findByEmail(email);
        const foundToken = await this.findResetPasswordToken(foundUser.id);

        if (foundToken) {
            const now = new Date();
            const tokenCreatedAt = foundToken.createdAt;
            const diff = (now.getTime() - tokenCreatedAt.getTime()) / 1000 / 60;

            if (diff < 15) {
                throw new TooManyRequestsException();
            }
        }

        const {id, fullName, email: userEmail} = foundUser;
        const payload: TokenPayload = {
            userId: id,
            fullName,
            email: userEmail,
        };
        const createJwtToken = this.createToken(payload, '15m');
        const resetToken = await this.createForgotPasswordToken(id, createJwtToken);
        const frontendUrl = process.env.FRONTEND_URL;
        return {
            resetToken: `${frontendUrl}/forgot/${resetToken.resetToken}`
        }
    }


    async findResetPasswordToken(userId: string): Promise<forgotPassword | null> {

        return await this.db.forgotPassword.findUnique({where: {userId}});
    }


    async createForgotPasswordToken(userId: string, resetToken: string): Promise<forgotPassword> {
        return await this.db.forgotPassword.create({data: {userId, resetToken}})
    }

    private createToken(payload: TokenPayload, expiresIn?: number | string): string {
        return expiresIn ? this.jwt.sign(payload, {expiresIn}) : this.jwt.sign(payload);
    }
}
