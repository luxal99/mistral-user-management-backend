import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './providers/permission.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
