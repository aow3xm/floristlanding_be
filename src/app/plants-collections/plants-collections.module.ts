import { Module } from '@nestjs/common';
import { PlantsCollectionsService } from './plants-collections.service';
import { PlantsCollectionsController } from './plants-collections.controller';
import { PrismaService } from '../../core/prisma';

@Module({
  controllers: [PlantsCollectionsController],
  providers: [PlantsCollectionsService, PrismaService],
  exports: [PlantsCollectionsService],
})
export class PlantsCollectionsModule {}
