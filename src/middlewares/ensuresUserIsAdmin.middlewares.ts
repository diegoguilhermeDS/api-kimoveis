import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensuresUserIsAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isAdmin = req.user.admin;
  const method = req.method
  
  if (!isAdmin) {
    if(+req.params.id !== req.user.id || method === "DELETE"){
      throw new AppError("Insufficient permission", 403);
    }

    if(req.baseUrl === "/users"){
      throw new AppError("Insufficient permission", 403);
    }


  }

  return next();
};

export default ensuresUserIsAdmin;
