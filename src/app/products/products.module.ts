import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../../core/prisma';
import { CollectionsModule } from '../collections';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  imports: [CollectionsModule],
})
export class ProductsModule {}
