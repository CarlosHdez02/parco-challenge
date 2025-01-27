import { Request, Response, NextFunction } from "express";
import SignupService from '../../services/authentication/Signup.service';
import SignInService from '../../services/authentication/SignIn.service';

export default class AuthController {
    private signUpService: SignupService;
    private signInService: SignInService;

    constructor() {
        this.signUpService = new SignupService();
        this.signInService = new SignInService();
    }

    public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const newUser = await this.signUpService.signUp(req.body);
            res.status(201).json({
                name:newUser.name,
                id: newUser.id,
                email: newUser.email,
                userType: newUser.userType
            });
        } catch (err) {
            next(err);
        }
    }

    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = await this.signInService.login(req.body);
            res.status(200).json({ token });
        } catch (err) {
            next(err);
        }
    }
}