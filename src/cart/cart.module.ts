import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../core/prisma';

@Module({
  controllers: [CartController, PrismaService],
  providers: [CartService],
})
export class CartModule {}
