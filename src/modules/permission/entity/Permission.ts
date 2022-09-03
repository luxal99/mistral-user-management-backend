import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionEnum } from '../enum/PermissionEnum';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PermissionEnum,
    name: 'permission_name',
  })
  permissionName: PermissionEnum;
}
