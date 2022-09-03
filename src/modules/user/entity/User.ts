import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "../../user-info/entity/UserInfo";
import { Permission } from "../../permission/entity/Permission";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'username' })
  username: string;

  @Column({ type: 'varchar', name: 'username' })
  password: string;


  @OneToOne(() => UserInfo, (userInfo) => userInfo.idUser)
  @JoinColumn()
  idUserInfo: UserInfo

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
