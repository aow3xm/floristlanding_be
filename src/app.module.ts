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
  ],
  providers: [AppService],
})
export class AppModule {}
