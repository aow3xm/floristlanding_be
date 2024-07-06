import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma';
import { PlantOnCollection } from '@prisma/client';

@Injectable()
export class PlantsCollectionsService {
  constructor(private readonly db: PrismaService) {}

  async addToCollection(
    plantId: string,
    collectionId: string,
  ): Promise<PlantOnCollection> {
    return this.db.plantOnCollection.create({
      data: { plantId, collectionId },
    });
  }
}
