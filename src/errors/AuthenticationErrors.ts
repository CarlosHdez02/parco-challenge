import { CustomError } from "../utils/CustomError";

export class AuthenticationErrors extends CustomError{
    statusCode=401
    constructor(public message:string){
        super(message);
        Object.setPrototypeOf(this,AuthenticationErrors.prototype);
        
    }
    serialize():{message:string}{
        return {message:this.message}
    }
}

export class UserAlreadyExistsError extends CustomError{
    statusCode=400
    constructor(){
        super("There is an user with that email in database")
        Object.setPrototypeOf(this, UserAlreadyExistsError.prototype)
    }
    serialize(): { message: string; } {
        return {message: this.message}
    }
}

export class MissingArgsErrors extends CustomError{
    statusCode=400
    constructor(){
        super("There are fields missing in request, should have name, email, password and userType")
        Object.setPrototypeOf(this, MissingArgsErrors.prototype)
    }
    serialize(): { message: string; } {
        return {message:this.message}
    }
}

export class MissingArgsLoginError extends CustomError{
    statusCode=400
    constructor(){
        super("Email or password are missing, please verify")
        Object.setPrototypeOf(this, MissingArgsLoginError.prototype)
    }
    serialize(): { message: string; } {
        return {message:this.message}
    }
}

export class UserTypeError extends CustomError{
    statusCode=400
    constructor(){
        super("The user type must be coporate, visitor or provider")
        Object.setPrototypeOf(this, UserTypeError.prototype)
    }
    serialize(): { message: string; } {
        return {message: this.message}
    }
}
