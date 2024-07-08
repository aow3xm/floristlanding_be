import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCartDto {
  @IsNotEmpty()
  @IsUUID()
  plantId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;
}
