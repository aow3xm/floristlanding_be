import { forwardRef, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from './core/config';
import { AuthModule } from './app/auth';
import { UsersModule } from './app/users';
import { EmailModule } from './core/email';
import { ProductsModule } from './app/products';
import { CollectionsModule } from './app/collections';
import { PlantsCollectionsModule } from './app/plants-collections';
import { CartModule } from './app/cart';
import { OrdersModule } from './app/orders';
import { UploadModule } from './core/upload';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    UsersModule,
    EmailModule,
    forwardRef(() => AuthModule),
    ProductsModule,
    CollectionsModule,
    PlantsCollectionsModule,
    CartModule,
    OrdersModule,
    UploadModule,
  ],
  providers: [AppService],
})
export class AppModule {}
