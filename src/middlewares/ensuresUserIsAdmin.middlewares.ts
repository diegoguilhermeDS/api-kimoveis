import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensuresUserIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isAdmin = req.user.admin;
  
  if (!isAdmin) {
    if(+req.params.id !== req.user.id){
      throw new AppError("Insufficient permission", 403);
    }
  }

  return next();
};

export default ensuresUserIsAdmin;