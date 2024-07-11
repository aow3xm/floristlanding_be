import { PotColors, PotSizes } from '@prisma/client';
import {
  IsArray,
  IsEnum,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { Type } from "class-transformer";

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

  @IsNotEmpty()
  @IsNumber()
  @Type(()=>Number)
  price:number;
}
