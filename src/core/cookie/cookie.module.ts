import { Module } from '@nestjs/common';
import { CookieService } from './cookie.service';

@Module({
  controllers: [CookieService],
  providers: [CookieService],
})
export class CookieModule {}
