import { Request, Response, NextFunction } from "express";
import UsersService from "../../services/users/users.service";

export default class UsersController {
   private usersService: UsersService;

   constructor() {
       this.usersService = new UsersService();
       this.getUsers = this.getUsers.bind(this);
       this.getUserById = this.getUserById.bind(this);
   }

   public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try {
           const users = await this.usersService.getUsers();
           res.status(200).json(users);
       } catch (err) {
           next(err);
       }
   };

   public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try {
           const { id } = req.params;
           const user = await this.usersService.getUserById(id);

           if (!user) {
               res.status(404).json({ message: "No user with that ID" });
               return;
           }

           res.status(200).json(user);
       } catch (err) {
           next(err);
       }
   };
}