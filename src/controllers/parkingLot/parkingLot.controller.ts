import { Request, Response, NextFunction } from "express";
import ParkingLotService from "../../services/parkingLot/parkingLot.service";
import ParkingLotDTO from "../../dto/parkingLots/parkingLot.dto";
import UsersService from "../../services/users/users.service";
import User from "../../entities/users/users.entity";
import { UserInterface } from "../../interfaces/user.interface";
import { JWTPayload } from "../../middlewares/authentication.middleware";

interface CustomRequest extends Request {
    user?: JWTPayload & Partial<UserInterface>;
  }

  
export default class ParkingLotController {
    private parkingLotService: ParkingLotService;
    private userService: UsersService;

    constructor() {
        this.parkingLotService = new ParkingLotService();
        this.userService = new UsersService();
    }

    public getParkingLots = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { skip, limit } = req.query;
            const order = (req.query.order as 'ASC' | 'DESC') || 'ASC';
            const orderParam = { name: order };

            const parkingLots = await this.parkingLotService.getAllParkingLots({
                skip: Number(skip) || 0,
                limit: Number(limit) || 10,
                order: orderParam
            });

            res.status(200).json(parkingLots);
        } catch (err) {
            console.error(err, "error here");
             next(err);
        }
    };

    public createParkingLot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const parkingLot: ParkingLotDTO = req.body;
            const newParkingLot = await this.parkingLotService.createParkingLot(parkingLot);
            res.status(201).json(newParkingLot);
        } catch (err) {
            console.error(err, "error here");
            next(err);
        }
    };

    public updateParkingLot = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const parkingLotData = new ParkingLotDTO(req.body);
            const updatedParkingLot = await this.parkingLotService.updateParkingLot(id, parkingLotData);
            res.status(200).json(updatedParkingLot);
        } catch (err) {
            console.error(err, "error here");
            next(err);
        }
    };

    public checkIn = async (req: CustomRequest, res: Response): Promise<void> => {
        try {
            console.log(req)
            debugger
            const { parkingId } = req.body;
    
            if (!req.user) {
                res.status(401).json({
                    errorCode: "UNAUTHORIZED",
                    message: "User not authenticated",
                });
                return;
            }
    
            // Create a full User object with required properties
             const user: Partial<User> = {
                id: req.user.id,
                email: req.user.email,
                userType: req.user.userType, 
            }; 
    debugger
            const checkin = await this.parkingLotService.checkIn(parkingId, user);
    
            if (checkin.status === "success") {
                res.status(200).json({ message: checkin.message });
                return;
            }
    
            res.status(400).json({
                errorCode: checkin.errorCode,
                message: checkin.message,
            });
        } catch (err) {
            console.error(err, "error here");
            res.status(500).json({
                errorCode: "INTERNAL_ERROR",
                message: "An unexpected error occurred",
            });
        }
    };
}