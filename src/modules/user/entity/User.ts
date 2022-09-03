import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user-info/entity/UserInfo';
import { Permission } from '../../permission/entity/Permission';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'username', unique: true })
  username: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.idUser, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'id_user_info' })
  idUserInfo: UserInfo;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
