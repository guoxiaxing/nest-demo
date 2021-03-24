import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleGuardService } from './role-guard.service';

@ApiBearerAuth()
@ApiTags('role-guard')
// 局部使用
@UseGuards(RolesGuard)
@Controller('/role-guard')
export class RoleGuardController {
  constructor(private readonly roleGuardService: RoleGuardService) {}

  // 查询
  @Get()
  @Roles('admin', 'admin1')
  @ApiQuery({ name: 'user', required: true })
  fetch(@Query('user') user: string): string {
    return this.roleGuardService.fetch(user);
  }
}
