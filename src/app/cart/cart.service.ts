import { Injectable } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './dto';
import { PrismaService } from '../../core/prisma';
import { TokenPayload } from '../auth/tokenPayload.interface';
import { ProductsService } from '../products';

@Injectable()
export class CartService {
  constructor(
    private readonly db: PrismaService,
    private readonly productService: ProductsService,
  ) {}
  async create(user: TokenPayload, createCartDto: CreateCartDto) {
    await this.productService.findOne(createCartDto.plantId);
    await this.db.cart.create({
      data: {
        userId: user.userId,
        ...createCartDto,
      },
    });
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
