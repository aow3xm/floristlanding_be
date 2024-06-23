import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {CookieModule} from "../../core/cookie";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "../../core/config";
import {ConfigService} from "@nestjs/config";
import {PrismaService} from "../../core/prisma";
import {UsersModule} from "../users";

@Module({
    controllers: [AuthController],
    providers: [AuthService, PrismaService],
    imports: [UsersModule, CookieModule, JwtModule.registerAsync({
        imports: [ConfigModule,],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET_KEY'),
            signOptions: {expiresIn: configService.get<string>('JWT_EXPIRE_IN')},
        }),
    }),]
})
export class AuthModule {
}
