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

  async findAll(s?: string): Promise<Collection[]> {
    if (!s) {
      return this.db.collection.findMany({ where: { deletedAt: null } });
    }
    return this.db.collection.findMany({
      where: {
        OR: [
          {
            title: {
              contains: s,
              mode: 'insensitive',
            },
          },
          {
            species: {
              contains: s,
              mode: 'insensitive',
            },
          },
        ],
        AND: {
          deletedAt: null,
        },
      },
    });
  }

  async findOneById(id: string): Promise<Collection> {
    const foundCollection = await this.db.collection.findUnique({
      where: { id, AND: { deletedAt: null } },
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
    const foundCollection = await this.findOneById(id);
    if (!foundCollection) {
      throw new CollectionNotFoundException(id);
    }
    return await this.db.collection.update({
      where: { id },
      data: { ...updateCollectionDto },
    });
  }

  async remove(id: string): Promise<Collection> {
    const foundCollection = await this.findOneById(id);
    if (!foundCollection || foundCollection.deletedAt) {
      throw new CollectionNotFoundException(id);
    }
    return this.db.collection.delete({
      where: { id },
    });
  }
}
