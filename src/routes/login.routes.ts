import { Router } from "express";
import { loginControllers } from "../controllers/login.controllers";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import { loginSchema } from "../schemas/login.schemas";

const loginRouter: Router = Router()

loginRouter.post("", ensuresDataISValid(loginSchema), loginControllers)

export default loginRouter