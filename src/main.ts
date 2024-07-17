import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from './core/exception';
import { ResponseInterceptor } from './core/response';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { validationOptions } from './core/validation';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  await app.listen(8080, '0.0.0.0');
}

bootstrap();
