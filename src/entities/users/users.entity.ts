import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserInterface, UserType } from "../../interfaces/user.interface";

@Entity('User')
export default class User {
   @PrimaryGeneratedColumn('uuid')
   id!: string;

   @Column()
   name: string = '';

   @Column()
   email:string =''

   @Column()
   password: string = '';

   @Column({
       type: "enum",
       enum: UserType
   })
   userType: UserType = UserType.VISITOR;   //  adding a default value

   @Column()
   createdAt: Date = new Date();

   constructor(data?: UserInterface) {
       if (data) {
           Object.assign(this, data);
       }
   }
}