import { Controller, Get, Res, UseFilters, UseGuards } from '@nestjs/common';
import { PermissionService } from './providers/permission.service';
import { Response } from 'express';
import { JwtGuard } from '../../helpers/guard/jwt.guard';
import { DefaultBadRequestException } from '../../helpers/exceptions/DefaultBadRequestException';
import { DefaultBadRequestExceptionFilter } from '../../helpers/http-filters/DefaultBadRequestExceptionFilter';

@UseGuards(JwtGuard)
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  @UseFilters(new DefaultBadRequestExceptionFilter())
  async getPermissions(@Res() res: Response) {
    try {
      res.send(await this.permissionService.getAllPermissions());
    } catch (err) {
      throw new DefaultBadRequestException();
    }
  }
}
