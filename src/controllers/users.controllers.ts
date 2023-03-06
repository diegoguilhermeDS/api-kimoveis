import { Request, Response } from "express";
import createUserService from "../services/users/createUser.services";
import listUserService from "../services/users/listUsers.services";

const createUserControllers = async (req: Request, res: Response) => {

    const userData = req.body

    const user = await createUserService(userData)

    return res.status(201).json(user)
}

const listUsersController = async (req: Request, res: Response) => {

    const users = await listUserService()

    return res.json(users)

}

export {
    createUserControllers,
    listUsersController
}