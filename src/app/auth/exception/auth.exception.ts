import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

export class EmailExistedException extends ConflictException {
  constructor() {
    super('Email has been existed.');
  }
}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid Credentials.');
  }
}

export class TooManyRequestsException extends HttpException {
  constructor() {
    super(
      'Please wait 15 minutes before each password reset.',
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}

export class TokenErrorException extends BadRequestException {
  constructor() {
    super('Token invalid or has been expired.');
  }
}
