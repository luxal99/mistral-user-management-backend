import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { PermissionService } from './providers/permission.service';
import { Response } from 'express';
import { JwtGuard } from "../../helpers/guard/jwt.guard";

@UseGuards(JwtGuard)
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async getPermissions(@Res() res: Response) {
    res.send(await this.permissionService.getAllPermissions());
  }
}
