export interface ParkingLotQueryParams{
    skip?: number;
    limit?: number;
    order?: { [key: string]: 'ASC' | 'DESC' };
}