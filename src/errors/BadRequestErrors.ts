import { CustomError } from "../utils/CustomError";

export class BadRequestErrors extends CustomError{
    statusCode =400
    constructor(public message: string){
        super(message);
        Object.setPrototypeOf(this,BadRequestErrors.prototype);
        
    }
    serialize():{message:string}{
        return {message:this.message}
    }
}