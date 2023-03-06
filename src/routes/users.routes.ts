import { Router } from "express";
import { createUserControllers, listUsersController, updateUserControllers } from "../controllers/users.controllers";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import ensuresEmailNotExists from "../middlewares/ensuresEmailNotExist.middlewares";
import ensuresIdUserNotExists from "../middlewares/ensuresIdUserNotExists.middlewares";
import ensuresTokenIsValid from "../middlewares/ensuresTokenIsValid.middlewares";
import ensuresUserIsAdmin from "../middlewares/ensuresUserIsAdmin.middlewares";
import { userSchema, updateUserSchema } from "../schemas/users.schemas";

const usersRouter: Router = Router()

usersRouter.post("", ensuresDataISValid(userSchema), ensuresEmailNotExists, createUserControllers)
usersRouter.get("", ensuresTokenIsValid, ensuresUserIsAdmin, listUsersController)
usersRouter.patch("/:id", ensuresDataISValid(updateUserSchema), ensuresIdUserNotExists, ensuresTokenIsValid, ensuresUserIsAdmin, updateUserControllers)


export default usersRouter