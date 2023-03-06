import { Request, Response } from "express";
import { iUserUpdate } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.services";
import deleteUserService from "../services/users/deleteUserServices";
import listUserService from "../services/users/listUsers.services";
import updateUserService from "../services/users/updateUser.services";

const createUserController = async (req: Request, res: Response) => {

    const userData = req.body

    const user = await createUserService(userData)

    return res.status(201).json(user)
}

const listUsersController = async (req: Request, res: Response) => {

    const users = await listUserService()

    return res.json(users)

}

const updateUserController = async (req: Request, res: Response) => {

    const newUserData: iUserUpdate = req.body
    const userId: number = parseInt(req.params.id)

    const newUser = await updateUserService(newUserData, userId)

    return res.json(newUser)
}

const deleteUserController = async (req: Request, res: Response) => {

    await deleteUserService(parseInt(req.params.id))

    return res.status(204).json()
}

export {
    createUserController,
    listUsersController,
    updateUserController,
    deleteUserController
}