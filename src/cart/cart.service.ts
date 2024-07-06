import { Injectable } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './dto';

import { PrismaService } from '../core/prisma';

@Injectable()
export class CartService {
  constructor(private readonly db: PrismaService) {}
  create(createCartDto: CreateCartDto) {
    console.log(createCartDto);
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    console.log(updateCartDto);
    return `This action updates a #${id} cart`;
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
