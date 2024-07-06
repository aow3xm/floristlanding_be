import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto';
import { Collection } from '@prisma/client';
import { JwtGuard, Public, Role, RolesGuard } from '../auth';

@UseGuards(JwtGuard, RolesGuard)
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Role('Admin')
  @Post()
  create(
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.create(createCollectionDto);
  }

  @Public()
  @Get()
  findAll(@Query('s') s?: string): Promise<Collection[]> {
    return this.collectionsService.findAll(s);
  }

  @Role('Admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionsService.update(id, updateCollectionDto);
  }

  @Role('Admin')
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Collection> {
    return this.collectionsService.remove(id);
  }
}
