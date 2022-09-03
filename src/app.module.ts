import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { databaseProviders } from "./config/database/database.config";
import { PermissionModule } from "./modules/permission/permission.module";
import { UserModule } from "./modules/user/user.module";
import { UserInfoModule } from "./modules/user-info/user-info.module";
import { CONFIG } from "./config/environment/environment.config";

@Module({
  imports: [CONFIG, PermissionModule, UserModule, UserInfoModule],
  controllers: [AppController],
  providers: [...databaseProviders, AppService],
})
export class AppModule {
}
