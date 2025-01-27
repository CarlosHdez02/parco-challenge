
export enum UserType {
    CORPORATE = 'corporate',
    PROVIDER = 'provider',
    VISITOR = 'visitor'
}

export interface UserInterface{
    id: string;
    parkingId: string;  //  its assigned to user once he checks in
    userType: UserType
    name:string;
    password:string;
    createdAt: Date;
    email:string;
}