import { Injectable } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from './dto';
import { PrismaService } from '../../core/prisma';
import { TokenPayload } from '../auth/tokenPayload.interface';
import { ProductsService } from '../products';
import { Cart } from '@prisma/client';
import { CartNotFoundException } from './exception';
import { NoPermissionException } from '../../core/exception';

@Injectable()
export class CartService {
  constructor(
    private readonly db: PrismaService,
    private readonly productService: ProductsService,
  ) {}

  async create(
    user: TokenPayload,
    createCartDto: CreateCartDto,
  ): Promise<Cart> {
    const foundProduct = await this.productService.findOne(
      createCartDto.plantId,
    );
    return await this.db.cart.create({
      data: {
        userId: user.userId,
        ...createCartDto,
        price: foundProduct.price * createCartDto.quantity,
      },
    });
  }

  async findAll(
    user: TokenPayload,
    page: number = 1,
    limit: number = 10,
  ): Promise<Cart[]> {
    const skip = (page - 1) * limit;

    return await this.db.cart.findMany({
      where: { userId: user.userId },
      skip: skip,
      take: limit,
    });
  }

  async findOne(id: string): Promise<Cart> {
    const foundCart = await this.db.cart.findFirst({
      where: { id },
    });
    if (!foundCart) {
      throw new CartNotFoundException(id);
    }
    return foundCart;
  }

  async update(
    id: string,
    user: TokenPayload,
    updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    const foundCart = await this.findOne(id);

    if (user.role !== 'Admin' && foundCart.userId !== user.userId) {
      throw new NoPermissionException();
    }

    return await this.db.cart.update({
      where: { id },
      data: { ...updateCartDto },
    });
  }

  async remove(id: string, user: TokenPayload): Promise<Cart> {
    const foundCart = await this.findOne(id);
    if (foundCart.deletedAt) {
      throw new CartNotFoundException(id);
    }
    if (user.role !== 'Admin' && foundCart.userId !== user.userId) {
      throw new NoPermissionException();
    }
    return await this.db.cart.delete({
      where: { id },
    });
  }
}
