import { NotFoundException } from '@nestjs/common';

export class OrderNotFoundException extends NotFoundException {
  constructor(id) {
    super(`Order with id ${id} not found`);
  }
}
