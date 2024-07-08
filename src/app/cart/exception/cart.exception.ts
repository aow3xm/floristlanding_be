import { NotFoundException } from '@nestjs/common';

export class CartNotFoundException extends NotFoundException {
  constructor(id) {
    super(`Cart with id ${id} not found`);
  }
}
