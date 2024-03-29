import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { iUserRepository } from "../interfaces/users.interfaces";

const ensuresEmailNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userData = req.body;

  if (userData.email) {
    const userRepository: iUserRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({
        where: {email: userData.email},
        withDeleted: true,
      });


    if (user) {
      throw new AppError("Email already exists", 409);
    }
  }

  return next();
};

export default ensuresEmailNotExists;
