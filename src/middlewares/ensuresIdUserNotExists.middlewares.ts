import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { iUserRepository } from "../interfaces/users.interfaces";

const ensuresIdUserNotExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userId: number = parseInt(req.params.id)

    const userRepository: iUserRepository = AppDataSource.getRepository(User)

    const findUserCount = await userRepository.countBy({id: userId})

    if(!findUserCount){
        throw new AppError("User not found", 404)
    }

    return next()
}

export default ensuresIdUserNotExists