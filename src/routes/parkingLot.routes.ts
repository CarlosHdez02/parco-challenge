import { Router } from "express";
import express from 'express'
import ParkingLotController from "../controllers/parkingLot/parkingLot.controller";
import { authenticateJWT } from '../middlewares/authentication.middleware';


class ParkingLotRoutes {
    private router: Router;
    private parkingLotController: ParkingLotController;

    constructor() {
        this.router = Router();
        this.parkingLotController = new ParkingLotController();
        this.initializedRoutes();
    }

    private initializedRoutes() {
        this.router.get('/parkingLots', authenticateJWT as express.RequestHandler, this.parkingLotController.getParkingLots);
        this.router.post('/parkingLots', authenticateJWT as express.RequestHandler,this.parkingLotController.createParkingLot);
        this.router.post('/parkingLot/checkin', authenticateJWT as express.RequestHandler,this.parkingLotController.checkIn);
        this.router.patch('/parkingLots/:id', authenticateJWT as express.RequestHandler,this.parkingLotController.updateParkingLot);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default new ParkingLotRoutes();