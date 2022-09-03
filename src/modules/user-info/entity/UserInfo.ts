import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enum/StatusEnum';
import { User } from '../../user/entity/User';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', name: 'email', unique: true })
  email: string;

  @Column({
    type: 'enum',
    default: StatusEnum.CREATED,
    enum: StatusEnum,
    name: 'status',
  })
  status: string;

  @OneToOne(() => User, (user) => user.idUserInfo) // specify inverse side as a second parameter
  idUser: User;
}
