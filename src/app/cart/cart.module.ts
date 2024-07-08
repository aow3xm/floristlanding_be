import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../../core/prisma';
import { ProductsModule } from '../products';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  imports: [ProductsModule],
})
export class CartModule {}
