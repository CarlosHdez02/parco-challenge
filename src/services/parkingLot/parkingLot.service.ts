/*  eslint-disable  */
import { dataBaseConfig } from "../../database/databaseSource";
import ParkingLotDTO from "../../dto/parkingLots/parkingLot.dto";
import UpdateParkingLotDTO from "../../dto/parkingLots/updateParkingLot.dto";
import ParkingLot from "../../entities/parkingLot/parkingLot.entity";
import {ExistingParkingLotError, MissingArgsError, MissingCheckInArgsError, NotFoundParkingLotError, ParkingLotTooLargeError, ParkingLotTooSmallError, ParkyingTypeError, UpdateParkingLotError, UpdateParkingLotMissingArgsError } from "../../errors/ParkingLotErrors";
import { CheckInFactory } from "../../factories/CheckInFactory";
import { ParkinglotInterface } from "../../interfaces/parkingLot.interface";
import { ParkingLotQueryParams } from "../../interfaces/queryParams.interface";
import User from "../../entities/users/users.entity";
import UsersService from "../users/users.service";


export default class ParkingLotService {

    

    private parkingLotRepository = dataBaseConfig.getRepository(ParkingLot)
    private userService: UsersService;

    constructor(){
        this.userService = new UsersService()
    }

    public async getAllParkingLots(props: ParkingLotQueryParams): Promise<{ data: ParkinglotInterface[]; totalItems: number } | { message: string }> {
        try {
            const skip = props.skip;
            const limit = props.limit;
            const order = props.order;
    
            const totalItems = await this.parkingLotRepository.count();
            if (totalItems === 0) {
                return {
                    message: "There are no parking lots in db",
                };
            }
            const data = await this.parkingLotRepository.find({
                skip,
                take: limit,
                order,
            });
    
            // Return the paginated data and total count
            return { totalItems, data };
        } catch (err) {
            console.error(err, "Error in getAllParkingLots");
            throw new Error("Failed to retrieve parking lots");
        }
    }
    
    public async getParkingLotById({ id }: ParkingLot): Promise<ParkingLot> {
        try {
            const parkingLot = await this.parkingLotRepository.findOne({ where: { id } })
            if (!parkingLot) {
                throw new NotFoundParkingLotError()
            }
            return await parkingLot
        } catch (err) {
            console.error(err, "here")
            throw new Error("Failed to retrieve the parking lot with that id")
        }
    }


    async createParkingLot(parkingLot: ParkingLotDTO): Promise<ParkingLot> {
        try {
            if (!parkingLot.contact || !parkingLot.name || !parkingLot.parkingType || !parkingLot.spots) {
                throw new MissingArgsError();
            }
            const parkingLotName = parkingLot.name.trim();
            parkingLot.name = parkingLotName;
    
            if (parkingLot.spots < 50) {
                throw new ParkingLotTooSmallError();
            }
            if (parkingLot.spots > 1500) {
                throw new ParkingLotTooLargeError();
            }
            const existingParkingLot = await this.parkingLotRepository.findOneBy({
                name: parkingLotName,
            });
    
            if (existingParkingLot) {
                throw new ExistingParkingLotError();
            }

            if (!['public', 'private', 'courtesy'].includes(parkingLot.parkingType)) {
                throw new ParkyingTypeError();
            }
            const { id, ...parkingLotData } = parkingLot;
            const newParkingLot = this.parkingLotRepository.create(parkingLotData);
    
            return await this.parkingLotRepository.save(newParkingLot);
        } catch (err) {
            if (err instanceof MissingArgsError) {
                throw err;
            }
            if (err instanceof ParkingLotTooSmallError) {
                throw err;
            }
            if (err instanceof ParkingLotTooLargeError) {
                throw err;
            }
            if (err instanceof ExistingParkingLotError) {
                throw err;
            }
            if(err instanceof ParkyingTypeError){
                throw err
            }
            throw new Error("Unexpected error, check your input")
        }
    }
    
    
    public async getParkingLotByName(parkingLot: ParkingLotDTO): Promise<ParkingLot | null> {
        try {
            const existingParkingLot = await this.parkingLotRepository.findOneBy({
                name: parkingLot.name
            });

            if (!existingParkingLot) {
                throw new NotFoundParkingLotError()
            }
            return existingParkingLot;
        } catch (err) {
            console.error("Error finding parking lot:", err);
            throw new Error("Failed to retrieve parking lot by name");
        }
    }

    async updateParkingLot(id: string, parkingLotData: Partial<UpdateParkingLotDTO>): Promise<ParkingLot> {
        try {
            const existingLot = await this.parkingLotRepository.findOne({ 
                where: { id },
                select: ['id', 'name', 'contact', 'spots', 'parkingType']
            });
    
            // Check if parkingLotData is an empty object
            if (!parkingLotData || Object.keys(parkingLotData).length === 0) {
                throw new UpdateParkingLotMissingArgsError();
            }
    
            if (!existingLot) {
                throw new ExistingParkingLotError();
            }
    
            const updatedLot = {
                ...existingLot,
                contact: parkingLotData.contact ?? existingLot.contact,
                spots: parkingLotData.spots ?? existingLot.spots
            };
    
            if (updatedLot.spots < 50) {
                throw new ParkingLotTooSmallError();
            }
            if (updatedLot.spots > 1500) {
                throw new ParkingLotTooLargeError();
            }
    
            return await this.parkingLotRepository.save(updatedLot);
        } catch (err) {
            if (err instanceof UpdateParkingLotMissingArgsError) {
                throw err;
            }
            if (err instanceof ParkingLotTooLargeError) {
                throw err;
            }
            if (err instanceof ParkingLotTooSmallError) {
                throw err;
            }
            throw new UpdateParkingLotError();
        }
    }
   
        async checkIn(parkingLotId: string, user: Partial<User>): Promise<{status: string, errorCode?: string, message?: string}> {
            try {
                if (!parkingLotId) {
                    throw new MissingCheckInArgsError();
                }
                
                const parkingLot = await this.parkingLotRepository.findOneBy({
                    id: parkingLotId
                });
                
                if (!parkingLot) {
                    return {
                        status: "error",
                        errorCode: "NOT_FOUND",
                        message: "Parking lot not found"
                    };
                }
                
                if (!user.userType) {
                    return {
                        status: "error",
                        errorCode: "INVALID_USER",
                        message: "User type is required"
                    };
                }
                
                const parkingLotHandler = CheckInFactory.getHandler(parkingLot.parkingType);
                const validationResult = parkingLotHandler.validate(user.userType, parkingLot);
                
                if (!validationResult.isValid) {
                    return {
                        status: "error",
                        errorCode: "ACCESS_DENIED",
                        message: validationResult.message
                    };
                }
                
                return { 
                    status: "success", 
                    message: validationResult.message 
                };
            } catch (err) {
                console.error(err, "Error at checkin");
                return {
                    status: "error",
                    errorCode: err instanceof NotFoundParkingLotError ? "NOT_FOUND" : "INTERNAL_ERROR",
                    message: err instanceof NotFoundParkingLotError ? "Parking lot not found" : "An unexpected error occurred"
                };
            }
        }
}