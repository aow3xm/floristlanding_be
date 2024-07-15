import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/';
import { PrismaService } from '../../core/prisma';
import { Plant, PotColors, PotSizes } from '@prisma/client';
import { CollectionsService } from '../collections';
import { PlantsCollectionsService } from '../plants-collections';
import { ProductNotFoundException } from './exception/products.exception';

@Injectable()
export class ProductsService {
  constructor(
    private readonly db: PrismaService,
    private readonly collectionService: CollectionsService,
    private readonly plantsCollectionsService: PlantsCollectionsService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Plant> {
    const { collectionIds, ...plantData } = createProductDto;

    if (collectionIds) {
      const uniqueCollectionIds = new Set(collectionIds);
      if (uniqueCollectionIds.size !== collectionIds.length) {
        throw new BadRequestException('Duplicate collection id.');
      }
      await Promise.all(
        collectionIds.map((collectionId) =>
          this.collectionService.findOneById(collectionId),
        ),
      );
    }

    const newPlant = await this.db.plant.create({ data: plantData });

    if (collectionIds && collectionIds.length > 0) {
      await Promise.all(
        collectionIds.map((collectionId) =>
          this.plantsCollectionsService.addToCollection(
            newPlant.id,
            collectionId,
          ),
        ),
      );
    }

    return newPlant;
  }

  async findAll(
    s?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<Plant[]> {
    if (!s) {
      return this.db.plant.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
    }

    const isString = (value: any): value is string => typeof value === 'string';
    const isPotColor = (value: any): value is PotColors =>
      Object.values(PotColors).includes(value);
    const isPotSize = (value: any): value is PotSizes =>
      Object.values(PotSizes).includes(value);

    const filters = [];

    if (isString(s)) {
      filters.push(
        { title: { contains: s, mode: 'insensitive' } },
        { description: { contains: s, mode: 'insensitive' } },
      );
    } else if (isPotColor(s)) {
      filters.push({ color: { equals: s } });
    } else if (isPotSize(s)) {
      filters.push({ potSize: { equals: s } });
    }

    return this.db.plant.findMany({
      where: {
        OR: filters,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Plant> {
    const foundProduct = await this.db.plant.findUnique({
      where: { id },
    });

    if (!foundProduct) {
      throw new ProductNotFoundException(id);
    }
    return foundProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Plant> {
    return await this.db.plant.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
      },
    });
  }

  async remove(id: string): Promise<Plant> {
    return await this.db.plant.delete({
      where: {
        id,
      },
    });
  }
}
