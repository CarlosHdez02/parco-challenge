import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserInterface, UserType } from '../../interfaces/user.interface';


export default class UsersDTO {

    constructor({parkingId, userType, name, password,email }: UserInterface) {

        this.parkingId = parkingId;
        this.userType = userType;
        this.name = name
        this.password = password;
        this.email=email
    }


    @IsNotEmpty()
    parkingId: string;
    @IsNotEmpty()
    userType: UserType

    @IsNotEmpty()
    @IsString()
    @Length(4, 20)
    name: string;
    
    @IsString()
    @Length(4, 20)
    password: string;

    @IsEmail()
    email:string;

}