import {Roles} from '@prisma/client';

export interface TokenPayload {
  userId: string;
  fullName: string;
  email: string;
  role: Roles;
}
