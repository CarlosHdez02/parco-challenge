import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from "typeorm";
import { ParkinglotInterface, ParkingType } from "../../interfaces/parkingLot.interface";

@Entity('ParkingLot')
export default class ParkingLot {
    @PrimaryGeneratedColumn('uuid')
    id!: string; 

    @Column({ unique: true })
    name: string = '';

    @Column()
    contact: string = '';

    @Column()
    spots: number = 0;

    @Column({
        type: 'enum',
        enum: ParkingType,
    })
    parkingType: ParkingType = ParkingType.PUBLIC;

    @CreateDateColumn()
    createdAt: Date = new Date();

    constructor(data?: ParkinglotInterface) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
