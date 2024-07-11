import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  plantId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;
}
