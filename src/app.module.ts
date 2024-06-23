import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModule} from "./core/config";
import {AuthModule} from './app/auth';
import {UsersModule} from './app/users';

@Module({
    imports: [ AuthModule, ConfigModule, UsersModule],
    providers: [AppService],
})
export class AppModule {
}
