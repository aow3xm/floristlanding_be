import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/';
import { PrismaService } from '../../core/prisma';
import { Plant, PlantOnCollection } from '@prisma/client';
import { CollectionsService } from '../collections';

@Injectable()
export class ProductsService {
  constructor(
    private readonly db: PrismaService,
    private readonly collectionService: CollectionsService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Plant> {
    const { collectionIds, ...plantData } = createProductDto;

    if (collectionIds) {
      await Promise.all(
        collectionIds.map((collectionId) =>
          this.collectionService.findOneById(collectionId),
        ),
      );
    }

    try {
      const newPlant = await this.db.plant.create({ data: plantData });

      if (collectionIds && collectionIds.length > 0) {
        await Promise.all(
          collectionIds.map((collectionId) =>
            this.addToCollection(newPlant.id, collectionId),
          ),
        );
      }

      return newPlant;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error for caller to handle
    }
  }

  async addToCollection(
    plantId: string,
    collectionId: string,
  ): Promise<PlantOnCollection> {
    return this.db.plantOnCollection.create({
      data: { plantId, collectionId },
    });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
