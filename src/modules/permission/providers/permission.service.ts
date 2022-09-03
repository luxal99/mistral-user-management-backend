import { Inject, Injectable } from "@nestjs/common";
import { PERMISSION_REPOSITORY_INJECTION_TOKEN } from "../../../config/injection-tokens/config";
import { Repository } from "typeorm";
import { Permission } from "../entity/Permission";

@Injectable()
export class PermissionService {
  constructor(
    @Inject(PERMISSION_REPOSITORY_INJECTION_TOKEN)
    private permissionRepository: Repository<Permission>
  ) {
  }

  async getAllPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }
}
