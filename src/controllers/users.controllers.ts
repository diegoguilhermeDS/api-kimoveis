import { Request, Response } from "express";
import createUserService from "../services/users/createUser.services";

const createUserControllers = async (req: Request, res: Response) => {

    const userData = req.body

    const user = await createUserService(userData)

    return res.status(201).json(user)
}

export {
    createUserControllers
}