import { IsString, IsNotEmpty, Length, IsEnum, IsNumber, IsOptional, IsDate, IsUUID } from "class-validator";
import { ParkingType } from '../../interfaces/parkingLot.interface';

export default class ParkingLotDTO {
    constructor(data: {
        name: string, 
        contact: string, 
        parkingType: ParkingType, 
        spots: number, 
        id?: string
        createdAt?:Date
    }) {
        this.name = data.name;
        this.contact = data.contact;
        this.parkingType = data.parkingType;
        this.spots = data.spots;
        this.id = data.id;
        this.createdAt = data.createdAt || new Date()
    }

    @IsUUID()
    id?: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @Length(10, 15)
    @IsString()
    @IsNotEmpty()
    contact: string;

    @IsNumber()
    @IsNotEmpty()
    spots: number;

    @IsNotEmpty()
    @IsEnum(ParkingType)
    parkingType: ParkingType;

    @IsOptional()
    @IsDate()
    createdAt: Date;
}