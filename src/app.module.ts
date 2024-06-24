import {forwardRef, Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModule} from "./core/config";
import {AuthModule} from './app/auth';
import {UsersModule} from './app/users';
import { MailModule } from './core/mail/mail.module';

@Module({
    imports: [ AuthModule, ConfigModule, UsersModule , forwardRef(()=>MailModule)],
    providers: [AppService],
})
export class AppModule {
}
