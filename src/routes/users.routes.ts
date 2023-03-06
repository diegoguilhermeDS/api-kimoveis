import { Router } from "express";
import { createUserControllers, listUsersController } from "../controllers/users.controllers";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import ensuresEmailNotExists from "../middlewares/ensuresEmailNotExist.middlewares";
import ensuresTokenIsValid from "../middlewares/ensuresTokenIsValid.middlewares";
import ensuresUserIsAdmin from "../middlewares/ensuresUserIsAdmin.middlewares";
import { userSchema } from "../schemas/users.schemas";

const usersRouter: Router = Router()

usersRouter.post("", ensuresDataISValid(userSchema), ensuresEmailNotExists, createUserControllers)
usersRouter.get("", ensuresTokenIsValid, ensuresUserIsAdmin, listUsersController)


export default usersRouter