import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../../core/prisma';
import { CollectionsModule } from '../collections';
import { PlantsCollectionsModule } from '../plants-collections';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  imports: [CollectionsModule, PlantsCollectionsModule],
  exports: [ProductsService],
})
export class ProductsModule {}
