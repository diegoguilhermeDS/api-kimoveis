import { Request, Response } from "express";
import { iUserUpdate } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.services";
import listUserService from "../services/users/listUsers.services";
import updateUserService from "../services/users/updateUser.services";

const createUserControllers = async (req: Request, res: Response) => {

    const userData = req.body

    const user = await createUserService(userData)

    return res.status(201).json(user)
}

const listUsersController = async (req: Request, res: Response) => {

    const users = await listUserService()

    return res.json(users)

}

const updateUserControllers = async (req: Request, res: Response) => {

    const newUserData: iUserUpdate = req.body
    const userId: number = parseInt(req.params.id)

    const newUser = await updateUserService(newUserData, userId)

    return res.json(newUser)
}

export {
    createUserControllers,
    listUsersController,
    updateUserControllers
}