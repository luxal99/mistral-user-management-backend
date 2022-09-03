import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {

  @PrimaryGeneratedColumn()
  id:number

  @Column({name:"permission_name",type:"varchar"})
  permissionName:string
}
