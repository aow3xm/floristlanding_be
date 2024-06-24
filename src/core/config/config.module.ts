import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import MailConfig from '../mail/mail.config';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true, // Đặt là global để không cần import vào từng module khác
            envFilePath: ['.env'], // Đường dẫn tới file .env
            load: [MailConfig],
        }),
        MailModule,
    ],
})
export class ConfigModule {}
