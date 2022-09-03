import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusEnum } from '../enum/StatusEnum';
import { User } from '../../user/entity/User';
import { Permission } from '../../permission/entity/Permission';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({
    type: 'enum',
    default: StatusEnum,
    enum: StatusEnum.ACTIVE,
    name: 'status',
  })
  status: string;

  @OneToOne(() => User, (user) => user.idUserInfo) // specify inverse side as a second parameter
  idUser: User;

}
