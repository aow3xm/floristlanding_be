import { forwardRef, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './core/config';
import { AuthModule } from './app/auth';
import { UsersModule } from './app/users';
import { EmailModule } from './core/email/email.module';
import { RolesModule } from './app/roles/roles.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UsersModule,
    EmailModule,
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  providers: [AppService],
})
export class AppModule {}
