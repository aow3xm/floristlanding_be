import { Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtGuard } from '../auth';
import { RolesGuard } from './roles.guard';
import { Role } from './roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('roles')
@Role('Admin')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  test() {
    return 'TEST OK';
  }
}
