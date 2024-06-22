import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CookieModule } from './core/cookie';
import {ConfigModule} from "./core/config";
import { AuthModule } from './app/auth';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [ CookieModule, AuthModule, ConfigModule, UsersModule],
  providers: [AppService],
})
export class AppModule {}
