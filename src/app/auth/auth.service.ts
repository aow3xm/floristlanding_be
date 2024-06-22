import {Injectable} from '@nestjs/common';
import {PrismaService} from "../../core/prisma";
import {UsersService} from "../users";
import {RegisterDto} from "./dto/register.dto";
import {User} from "@prisma/client";
import {HashHelper} from "../../helpers/hash";
import {Utils} from "../../helpers/utils";
import {EmailExistedException, InvalidCredentialsException} from "./exception";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {LoginDto} from "./dto/login.dto";
import {TokenPayload} from "./tokenPayload.interface";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private db: PrismaService, private userService: UsersService, private jwt: JwtService) {
    }

    async register(register: RegisterDto): Promise<User> {
        const hashedPassword = await HashHelper.hash(register.password)
        try {
            const user = await this.userService.create({
                ...register,
                password: hashedPassword
            })
            return {
                ...user,
                password: null
            }
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError && e.code === Utils.PrismaError.UniqueConstaintFailed) {
                throw new EmailExistedException()
            }
        }
    }

    async login(user: LoginDto): Promise<string> {
        const foundUser = await this.userService.findByEmail(user.email)
        try {
            const isValid = await HashHelper.verify(user.password, foundUser.password)
            if (!isValid) {
                throw new InvalidCredentialsException()
            }
            const payload: TokenPayload = {
                userId: foundUser.id,
                fullName: foundUser.fullName,
                email: foundUser.email,
            }
            return this.createToken(payload);
        } catch (e) {
            if (e instanceof InvalidCredentialsException) {
                throw e
            }
        }

    }

    createToken(payload: TokenPayload, expiresIn?: number): string {
        return expiresIn ? this.jwt.sign(payload, {expiresIn}) : this.jwt.sign(payload)
    }
}
