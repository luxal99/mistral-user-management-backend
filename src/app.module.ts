import { Module } from '@nestjs/common';
import { databaseProviders } from './config/database/database.config';
import { PermissionModule } from './modules/permission/permission.module';
import { UserModule } from './modules/user/user.module';
import { UserInfoModule } from './modules/user-info/user-info.module';
import { CONFIG } from './config/environment/environment.config';

@Module({
  imports: [CONFIG, UserModule, PermissionModule, UserInfoModule],
  providers: [...databaseProviders],
})
export class AppModule {}
