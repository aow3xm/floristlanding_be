import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './cookie/core/core.module';
import { CookieModule } from './core/cookie/cookie.module';

@Module({
  imports: [CoreModule, CookieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
