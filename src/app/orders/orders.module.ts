import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '../../core/prisma';
import { ProductsModule } from '../products';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
  imports: [ProductsModule],
})
export class OrdersModule {}
