/*  eslint-disable  */
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { AuthInterface } from "../../interfaces/authentication.interface";
import { UserType } from "../../interfaces/user.interface";
export class AuthenticationDTO{

    constructor({email,password, name, userType}:AuthInterface){
        this.email=email
        this.password=password,
        this.name = name,
        this.userType = userType
    }

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsNotEmpty()
    userType: UserType

    @IsNotEmpty()
    name:string;
}