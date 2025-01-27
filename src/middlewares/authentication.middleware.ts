/*  eslint-disable  */
import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserType } from '../interfaces/user.interface';

export interface JWTPayload {
  id: string;
  userType: UserType;
  iat: number; //Timestamp of creation 
  exp: number; // when it will expire 
}

export const authenticateJWT = (
    req: Request, 
    res: Response, 
    next: NextFunction
  ): void => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      res.status(401).json({ error: 'Malformed authorization header' });
      return;
    }
  
    try {
      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET as string
      ) as JWTPayload;
  
      (req as any | unknown).user = decoded;
      next();
    } catch (err) {
      res.status(403).json({ error: 'Invalid token' });
    }
  };