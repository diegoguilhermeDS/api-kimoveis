import { Router } from "express";
import { createUserControllers } from "../controllers/users.controllers";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import ensuresEmailNotExists from "../middlewares/ensuresEmailNotExist.middlewares";
import { userSchema } from "../schemas/users.schemas";

const usersRouter: Router = Router()

usersRouter.post("", ensuresDataISValid(userSchema), ensuresEmailNotExists, createUserControllers)


export default usersRouter