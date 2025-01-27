import { CustomError } from "../utils/CustomError";

export class DatabaseError extends CustomError{
    statusCode = 500
    constructor(public message:string){
        super(message);
        Object.setPrototypeOf(this,DatabaseError.prototype);

    }
    serialize():{message:string}{
        return {message: this.message}
    }
}