
/*
    public: everyone can enter;
    private: only users with type corporate: monday to friday
    courtesy: only users with type visitor and on weekends

*/
export enum ParkingType {
    PUBLIC = 'public',
    PRIVATE = 'private',
    COURTESY = 'courtesy'
}

export interface ParkinglotInterface{
    id:string;
    spots:number;
    name:string;
    contact: string;
    parkingType: ParkingType
    createdAt:Date;
}

