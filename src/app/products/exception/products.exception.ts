import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(id) {
    super(`Product with id ${id} not found`);
  }
}
