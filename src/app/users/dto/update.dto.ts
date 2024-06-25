import { Roles } from '@prisma/client';

export class UpdateUserDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: Roles;
}
