import { UnauthorizedException } from '@nestjs/common';

export class NoPermissionException extends UnauthorizedException {
  constructor() {
    super('You do not have permission to perform this action');
  }
}
