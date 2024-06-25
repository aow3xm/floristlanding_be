import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/prisma';
import { User } from '@prisma/client';
import { UserNotFoundException } from './exception';
import { CreateUserDto } from './dto';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.db.user.findUnique({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return await this.db.user.create({
      data: {
        ...userDto,
      },
    });
  }

  async update(userId: string, userDto: UpdateUserDto): Promise<User> {
    return await this.db.user.update({
      where: {
        id: userId,
      },
      data: {
        ...userDto,
      },
    });
  }
}
