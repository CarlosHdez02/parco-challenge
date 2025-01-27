import { CustomError } from "../utils/CustomError";

export class NoUsersFound extends CustomError{
    statusCode=200
    constructor(){
        super("There are no users in database")
        Object.setPrototypeOf(this,NoUsersFound.prototype)
    }
    serialize(): { message: string; } {
        return {message: this.message}
    }
}

export class NoUserFound extends CustomError{
    statusCode=400
    constructor(){
        super("There is no user with that email in database")
        Object.setPrototypeOf(this,NoUserFound.prototype)
    }
    serialize(): { message: string; } {
        return {message:this.message}
    }
}

export class InvalidPasswordError extends CustomError{
    statusCode=400
    constructor(){
        super("Incorrect password, try again")
        Object.setPrototypeOf(this,InvalidPasswordError.prototype)
    }
    serialize(): { message: string; } {
        return {message:this.message}
    }
}

export class UserTypesError extends CustomError{
    statusCode=400
    constructor(){
        super("The allowed user types are: corporate, provider and visitor, try again")
        Object.setPrototypeOf(this, UserTypesError.prototype)

    }
    serialize():{message:string}{
        return {message:this.message}
    }
}