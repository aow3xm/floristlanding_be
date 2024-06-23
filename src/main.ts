import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ExceptionFilter} from "./core/exception";
import {ResponseInterceptor} from "./core/response";
import * as cookieParser from "cookie-parser";
import {ValidationPipe} from "@nestjs/common";
import {validationOptions} from "./core/validation";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new ExceptionFilter())
    app.useGlobalInterceptors(new ResponseInterceptor())
    app.use(cookieParser())
    app.useGlobalPipes(new ValidationPipe(validationOptions))
    await app.listen(8080);
}

bootstrap();
