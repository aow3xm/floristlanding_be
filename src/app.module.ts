import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModule} from './core/config';
import {AuthModule} from './app/auth';
import {UsersModule} from './app/users';
import {EmailModule} from './core/email/email.module';

@Module({
  imports: [AuthModule, ConfigModule, UsersModule, EmailModule],
  providers: [AppService],
})
export class AppModule {}
