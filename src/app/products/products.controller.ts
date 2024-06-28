import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Plant } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query('s') s?: string): Promise<Plant[]> {
    return this.productsService.findAll(s);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Plant> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Plant> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Plant> {
    return this.productsService.remove(id);
  }
}
