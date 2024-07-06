import { Injectable } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './dto';
import { PrismaService } from '../../core/prisma';
import { TokenPayload } from '../auth/tokenPayload.interface';

@Injectable()
export class CartService {
  constructor(private readonly db: PrismaService) {}
  create(user: TokenPayload, createCartDto: CreateCartDto) {
    console.log(user, createCartDto);
    return 'This action adds a new cart';
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cart`;
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    console.log(updateCartDto);
    return `This action updates a #${id} cart`;
  }

  remove(id: string) {
    return `This action removes a #${id} cart`;
  }
}
