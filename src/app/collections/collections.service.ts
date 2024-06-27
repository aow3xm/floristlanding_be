import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCollectionDto, UpdateCollectionDto } from './dto';
import { JwtGuard, Role, RolesGuard } from '../auth';
import { Collection } from '@prisma/client';
import { PrismaService } from '../../core/prisma';
import { CollectionNotFoundException } from './exception/collections.exception';

@Injectable()
@UseGuards(JwtGuard, RolesGuard)
@Role('Admin')
export class CollectionsService {
  constructor(private readonly db: PrismaService) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    return this.db.collection.create({
      data: { ...createCollectionDto },
    });
  }

  findAll(): string {
    return 'This action returns all collections';
  }

  async findOneById(id: string): Promise<Collection> {
    const foundCollection = await this.db.collection.findUnique({
      where: { id },
    });
    if (!foundCollection) {
      throw new CollectionNotFoundException(id);
    }
    return foundCollection;
  }

  async update(
    id: string,
    updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.db.collection.update({
      where: { id },
      data: { ...updateCollectionDto },
    });
  }

  remove(id: string): string {
    return `This action removes a #${id} collection`;
  }
}
