import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {CookieModule} from "../../core/cookie";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [CookieModule]
})
export class AuthModule {}
