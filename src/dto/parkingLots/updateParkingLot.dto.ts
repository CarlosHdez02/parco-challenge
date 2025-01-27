import { IsNotEmpty, Length } from "class-validator";

export default class UpdateParkingLotDTO {
    @Length(2, 13)
    @IsNotEmpty()
    contact?: string;

    @IsNotEmpty()
    spots?: number;

    constructor(data: Partial<UpdateParkingLotDTO> = {}) {
        Object.assign(this, data);
    }
}