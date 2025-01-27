import { Router } from "express";
import UsersController from "../controllers/users/users.controller";

class UserRoutes{
    private router: Router;
    private userController: UsersController;

    constructor(){
        this.router = Router()
        this.userController = new UsersController()
        this.initializedRoutes()
    }
    private initializedRoutes(){
        this.router.get('/users', this.userController.getUsers)
        this.router.get('/users/:id', this.userController.getUserById)
    }
    public getRouter(): Router{
        return this.router;
    }
}
export default new UserRoutes()