import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './providers/permission.service';
import { permissionProvider } from './providers/permission.provider';
import { databaseProviders } from '../../config/database/database.config';

@Module({
  controllers: [PermissionController],
  providers: [...permissionProvider, ...databaseProviders, PermissionService],
})
export class PermissionModule {}
