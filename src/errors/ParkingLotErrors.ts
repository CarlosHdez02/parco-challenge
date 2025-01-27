import { CustomError } from "../utils/CustomError";


//  parking lot creation errors
export class ParkingLotTooSmallError extends CustomError {
  statusCode = 400; 

  constructor() {
    super("The parking lot is too small. It must have at least 50 spots.");
    Object.setPrototypeOf(this, ParkingLotTooSmallError.prototype);
  }

  serialize(): { message: string } {
    return { message: this.message };
  }
}

export class ParkingLotTooLargeError extends CustomError {
  statusCode = 400; 

  constructor() {
    super("The parking lot is too large. It cannot have more than 1500 spots.");
    Object.setPrototypeOf(this, ParkingLotTooLargeError.prototype);
  }

  serialize(): { message: string } {
    return { message: this.message };
  }
}

export class ExistingParkingLotError extends CustomError {
  statusCode = 400;

  constructor() {
    super("The parking lot name must be unique.");
    Object.setPrototypeOf(this, ExistingParkingLotError.prototype);
  }

  serialize(): { message: string } {
    return { message: this.message };
  }

}
export class NotFoundParkingLotError extends CustomError{
  statusCode =400
  constructor(){
    super("The parkingLot does not exist")
    Object.setPrototypeOf(this, NotFoundParkingLotError.prototype)
  }
  serialize():{message:string}{
    return{message:this.message}
  }
}

export class ParkingLotTypeError extends CustomError{
  statusCode = 400
  constructor(){
    super("The parkinglot name does not match the stablished types")
    Object.setPrototypeOf(this, ParkingLotTypeError.prototype)
  }
  serialize():{message:string}{
    return{message:this.message}
  }
}

export class NoParkingLots extends CustomError{
  statusCode=200
  constructor(){
    super("There are no parkinglots in database")
    Object.setPrototypeOf(this, NoParkingLots.prototype)
  }
  serialize():{message:string}{
    return{message:this.message}
  }
}

export class MissingArgsError extends CustomError{
  statusCode=400
  constructor(){
    super("Contact or name or parkying type field are missing, please fill them")
    Object.setPrototypeOf(this, MissingArgsError.prototype)
  }
  serialize(): { message: string; } {
    return{message:this.message}
  }
}

export class ParkyingTypeError extends CustomError{
  statusCode=400
  constructor(){
    super("The parking types allowed are public, private and courtesy, please only use those")
    Object.setPrototypeOf(this, ParkyingTypeError.prototype)
  }
  serialize(): { message: string; } {
    return {message: this.message}
  }
}

export class UpdateParkingLotError extends CustomError{
  statusCode=400
  constructor(){
    super("The only fields available for updating are the spots and contact")
    Object.setPrototypeOf(this, UpdateParkingLotError.prototype)
  }
  serialize(): { message: string; } {
    return {message:this.message}
  }
}

export class UpdateParkingLotMissingArgsError extends CustomError{
  statusCode=400
  constructor(){
    super("The only fields available for updating are the spots and contact")
    Object.setPrototypeOf(this, UpdateParkingLotMissingArgsError.prototype)
  }
  serialize(): { message: string; } {
    return {message:this.message}
  }
}
//  Checkin custom errors
export class PrivateParkingLotError extends CustomError{
  statusCode= 400
  constructor(){
    super("Only coorporate users can use private parking on weekdays")
    Object.setPrototypeOf(this, PrivateParkingLotError.prototype)
  }
  serialize():{message:string}{
    return {message:this.message}
  }
}

export class CourtesyParkingLotError extends CustomError{
  statusCode=400
  constructor(){
    super("Only visitor users can use courtesy and its only available on weekends")
  }
  serialize():{message:string}{
    return {message: this.message}
  }
}

export class MissingCheckInArgsError extends CustomError{
  statusCode=400
  constructor(){
    super("ParkingId or userType are missing, please, try again")
  }
  serialize(): { message: string; } {
    return {message:this.message}
  }
}
