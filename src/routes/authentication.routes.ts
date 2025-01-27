import { Router } from "express";
import AuthController from "../controllers/authentication/authentication.controller";

class AuthRoutes{
    private router: Router;
    private authController: AuthController;

    constructor(){
        this.router= Router()
        this.authController = new AuthController()
        this.initializedRoutes()
    }

    private initializedRoutes(){
        this.router.post('/signup', this.authController.signUp)
        this.router.post('/login', this.authController.login)
    }
    public getRouter(): Router{
        return this.router;
    }
}
export default new AuthRoutes