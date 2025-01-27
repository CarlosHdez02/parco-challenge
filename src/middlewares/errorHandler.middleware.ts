import { ErrorRequestHandler, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
export const errorHandler: ErrorRequestHandler = (
  error: Error, 
  req: Request, 
  res: Response, 
 // next: NextFunction
) => {
  console.error('Unhandled error:', error);

  if (error instanceof CustomError) {
      res.status(error.statusCode).json({
          error: error.constructor.name,
          message: error.message
      });
      return;
  }  
};

