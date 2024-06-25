import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaError, PrismaService } from '../../core/prisma';
import { UsersService } from '../users';
import { LoginDto, RegisterDto, ResetPasswordDto } from './dto';
import { forgotPassword, User } from '@prisma/client';
import { HashHelper } from '../../helpers/hash';
import {
  EmailExistedException,
  InvalidCredentialsException,
  TokenErrorException,
  TooManyRequestsException,
} from './exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { TokenPayload } from './tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { EmailService, TemplateKey } from '../../core/email';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly userService: UsersService,
    private readonly jwt: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const hashedPassword = await HashHelper.hash(registerDto.password);
    try {
      const user = await this.userService.create({
        ...registerDto,
        password: hashedPassword,
      });
      return { ...user, password: null };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.UniqueConstaintFailed
      ) {
        throw new EmailExistedException();
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const foundUser = await this.userService.findByEmail(loginDto.email);
    const isValid = await HashHelper.verify(
      loginDto.password,
      foundUser.password,
    );
    if (!isValid) {
      throw new InvalidCredentialsException();
    }
    const payload: TokenPayload = {
      userId: foundUser.id,
      fullName: foundUser.fullName,
      email: foundUser.email,
      role: foundUser.role,
    };
    const accessToken = this.createToken(payload);
    return { accessToken };
  }

  async forgotPassword(email: string): Promise<{ resetToken: string }> {
    const foundUser = await this.userService.findByEmail(email);
    const foundToken = await this.findResetPasswordToken(foundUser.id);
    if (foundToken) {
      const now = new Date();
      const tokenCreatedAt = foundToken.createdAt;
      const limit = 15;
      const diff = (now.getTime() - tokenCreatedAt.getTime()) / 1000 / 60;
      if (diff < limit) {
        throw new TooManyRequestsException();
      } else {
        await this.deleteResetPasswordToken(foundUser.id);
      }
    }
    const { id, fullName, email: userEmail, role } = foundUser;
    const payload: TokenPayload = {
      userId: id,
      fullName,
      email: userEmail,
      role,
    };
    const createJwtToken = this.createToken(payload, '15m');
    const resetToken = await this.createForgotPasswordToken(id, createJwtToken);
    const frontendForgotUrl = `${process.env.FRONTEND_URL}/forgot?token=${resetToken.resetToken}`;
    await this.emailService.sendEmail(
      foundUser.email,
      TemplateKey.ForgotPassword,
      { reset_password_url: frontendForgotUrl },
    );
    return { resetToken: frontendForgotUrl };
  }

  async resetPassword(
    token: string,
    resetDto: ResetPasswordDto,
  ): Promise<User> {
    this.verifyToken(token);
    const decoded: TokenPayload = this.jwt.decode(token);
    const foundToken = await this.findResetPasswordToken(decoded.userId);
    if (!foundToken || token !== foundToken.resetToken) {
      throw new TokenErrorException();
    }
    if (resetDto.password !== resetDto.confirmPassword) {
      throw new BadRequestException('Password does not match.');
    }
    const hashedPassword = await HashHelper.hash(resetDto.password);
    const updateDto = { password: hashedPassword };
    await this.deleteResetPasswordToken(decoded.userId);
    return await this.userService.update(decoded.userId, updateDto);
  }

  verifyToken(
    token: string,
    secret: string = process.env.JWT_SECRET_KEY,
  ): boolean {
    try {
      return !!this.jwt.verify(token, { secret });
    } catch (e) {
      throw new TokenErrorException();
    }
  }

  createToken(payload: TokenPayload, expiresIn?: number | string): string {
    return expiresIn
      ? this.jwt.sign(payload, { expiresIn })
      : this.jwt.sign(payload);
  }

  async deleteResetPasswordToken(userId: string): Promise<void> {
    await this.db.forgotPassword.delete({ where: { userId } });
  }

  async findResetPasswordToken(userId: string): Promise<forgotPassword | null> {
    return await this.db.forgotPassword.findUnique({ where: { userId } });
  }

  async createForgotPasswordToken(
    userId: string,
    resetToken: string,
  ): Promise<forgotPassword> {
    return await this.db.forgotPassword.create({
      data: { userId, resetToken },
    });
  }
}
