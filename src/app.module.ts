import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CookieModule } from './core/cookie';
import {ConfigModule} from "./core/config";
import { AuthModule } from './app/auth';

@Module({
  imports: [ CookieModule, AuthModule, ConfigModule],
  providers: [AppService],
})
export class AppModule {}
