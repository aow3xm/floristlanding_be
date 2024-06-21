import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import {CookieService} from "../../core/cookie";
import {Request, Response} from 'express'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly cookieService:CookieService) {}
  @Get()
  test(){
    return {
      msg: 'hello, world'
    }
  }
}
