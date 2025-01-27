import User from "./entities/users/users.entity";
import { UserInterface } from "./interfaces/user.interface";
import { JWTPayload } from "./middlewares/authentication.middleware";

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload & Partial<UserInterface> & Partial<User>;
    }
  }
}

export {};