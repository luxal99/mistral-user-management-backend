import { Controller, Get, Res } from '@nestjs/common';
import { PermissionService } from './providers/permission.service';
import { Response } from 'express';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async getPermissions(@Res() res: Response) {
    res.send(await this.permissionService.getAllPermissions());
  }
}
