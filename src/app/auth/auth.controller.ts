import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CookieService} from "../../core/cookie";
import {RegisterDto} from "./dto/register.dto";
import {User} from "@prisma/client";
import {LoginDto} from "./dto/login.dto";
import {ForgotPasswordDto} from "./dto/forgot-password.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly cookieService: CookieService) {
    }


    @Post('register')
    register(@Body() registerDto: RegisterDto): Promise<User> {
        return this.authService.register(registerDto)
    }

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        return this.authService.login(loginDto)
    }

    @Post('forgot-password')
    forgotPassword(@Body() {email}: ForgotPasswordDto) {
        return this.authService.forgotPassword(email)
        // console.log(body?.email)
    }

}
