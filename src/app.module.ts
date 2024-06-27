import { forwardRef, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './core/config';
import { AuthModule } from './app/auth';
import { UsersModule } from './app/users';
import { EmailModule } from './core/email';
import { ProductsModule } from './app/products/products.module';
import { CollectionsModule } from './app/collections/collections.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UsersModule,
    EmailModule,
    forwardRef(() => AuthModule),
    ProductsModule,
    CollectionsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
