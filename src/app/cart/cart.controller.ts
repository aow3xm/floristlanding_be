import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto';
import { GetUser, JwtGuard } from '../auth';
import { TokenPayload } from '../auth/tokenPayload.interface';
import { Cart } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(
    @GetUser() user: TokenPayload,
    @Body() createCartDto: CreateCartDto,
  ): Promise<Cart> {
    return await this.cartService.create(user, createCartDto);
  }

  @Get()
  async findAll(
    @GetUser() user: TokenPayload,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<Cart[]> {
    return await this.cartService.findAll(user, page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cart> {
    return await this.cartService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @GetUser() user: TokenPayload,
    @Body() updateCartDto: UpdateCartDto,
  ): Promise<Cart> {
    return await this.cartService.update(id, user, updateCartDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @GetUser() user: TokenPayload,
  ): Promise<Cart> {
    return await this.cartService.remove(id, user);
  }
}
