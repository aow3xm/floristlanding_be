import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '../../core/config';
import {ConfigService} from '@nestjs/config';
import {PrismaService} from '../../core/prisma';
import {UsersModule} from '../users';
import {EmailService} from '../../core/email';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, EmailService],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE_IN') },
      }),
    }),
  ],
})
export class AuthModule {}
