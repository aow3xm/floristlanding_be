import { PotColors, PotSizes } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsEnum(PotColors)
  color: PotColors;

  @IsNotEmpty()
  @IsEnum(PotSizes)
  potSize: PotSizes;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  collectionIds: string[];
}
