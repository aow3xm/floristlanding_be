import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from '../../core/prisma';
import { Order } from '@prisma/client';
import { ProductsService } from '../products';
import { TokenPayload } from '../auth/tokenPayload.interface';
import { OrderNotFoundException } from './exception';

@Injectable()
export class OrdersService {
  constructor(
    private readonly db: PrismaService,
    private readonly productService: ProductsService,
  ) {}

  async create(
    user: TokenPayload,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const foundProduct = await this.productService.findOne(
      createOrderDto.plantId,
    );
    const totalPrice = foundProduct.price * createOrderDto.quantity;
    const orderData = { ...createOrderDto, userId: user.userId, totalPrice };

    return await this.db.order.create({ data: orderData });
  }

  async findAll(): Promise<Order[]> {
    return await this.db.order.findMany();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.db.order.findUnique({ where: { id } });
    if (!order) {
      throw new OrderNotFoundException(id);
    }
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.findOne(id);
    return await this.db.order.update({ where: { id }, data: updateOrderDto });
  }

  async remove(id: string): Promise<Order> {
    await this.findOne(id);
    return await this.db.order.delete({ where: { id } });
  }
}
