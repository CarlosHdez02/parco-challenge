import { dataBaseConfig } from "../../database/databaseSource";
import User from "../../entities/users/users.entity";
import { InvalidPasswordError, NoUserFound } from "../../errors/UsersErrors";
import { AuthInterface } from "../../interfaces/authentication.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { MissingArgsLoginError } from "../../errors/AuthenticationErrors";
dotenv.config()

export default class SignInService {
    private UserRepository;

    constructor() {
        this.UserRepository = dataBaseConfig.getRepository(User);
    }

    private generateToken(user: User): string {
        const secretKey = process.env.JWT_SECRET || "parcoAppSecret";
        const payload = {
            id: user.id,
            userType: user.userType,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (60 * 60)
        };
     
        const token = jwt.sign(payload, secretKey);
        return token;
    }

    public async login(loginData: AuthInterface): Promise<{ token: string }> {
        try {
            const user = await this.UserRepository.findOneBy({ email: loginData.email });

            if (!user) {
                throw new NoUserFound()
            }

            if(!loginData.email || !loginData.password){
                throw new MissingArgsLoginError()
            }

            const validPassword = await bcrypt.compare(loginData.password, user.password);
            if (!validPassword) {
                throw new InvalidPasswordError()
            }

            const token = this.generateToken(user); 
            return { token };
        } catch (err) {
            if(err instanceof MissingArgsLoginError){
                throw err
            }
            if(err instanceof InvalidPasswordError){
                throw err
            }
            if(err instanceof NoUserFound){
                throw err
            }
            console.error(err, "error here");
            throw new Error("Error at login");
        }
    }
}