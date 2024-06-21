import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true, // Đặt là global để không cần import vào từng module khác
            envFilePath: ['.env'], // Đường dẫn tới file .env
        }),
    ],
})
export class ConfigModule {}
