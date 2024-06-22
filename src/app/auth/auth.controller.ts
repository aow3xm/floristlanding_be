import {Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CookieService} from "../../core/cookie";
import {RegisterDto} from "./dto/register.dto";
import {User} from "@prisma/client";
import {LoginDto} from "./dto/login.dto";
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly cookieService:CookieService) {}


  @Post('register')
  register(@Body() user:RegisterDto):Promise<User>{
    return this.authService.register(user)
  }

  @Post('login')
  login(@Body() user:LoginDto):Promise<string>{
    return this.authService.login(user)
  }
}
