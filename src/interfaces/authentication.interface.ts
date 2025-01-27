import { UserType } from "./user.interface";

export interface AuthInterface{
    name:string;
    email:string;
    password:string;
    userType: UserType
}
