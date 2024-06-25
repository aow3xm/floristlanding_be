import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  forgotPassword(
    @Body() { email }: ForgotPasswordDto,
  ): Promise<{ resetToken: string }> {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  resetPassword(
    @Query('token') token: string,
    @Body() resetDto: ResetPasswordDto,
  ): Promise<User> {
    return this.authService.resetPassword(token, resetDto);
  }
}
