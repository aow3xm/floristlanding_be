import { Controller } from '@nestjs/common';
import { PlantsCollectionsService } from './plants-collections.service';
import { PrismaService } from '../../core/prisma';

@Controller('plants-collections')
export class PlantsCollectionsController {
  constructor(
    private readonly db: PrismaService,
    private readonly plantsCollectionsService: PlantsCollectionsService,
  ) {}
}
