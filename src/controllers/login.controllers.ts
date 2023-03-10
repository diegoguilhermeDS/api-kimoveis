import { Request, Response } from "express"
import { iLogin } from "../interfaces/login.interfaces"
import loginService from "../services/login/login.services"

const loginControllers = async (req: Request, res: Response) => {

    const loginData: iLogin = req.body

    const token = await loginService(loginData)

    return res.json({token: token})
}

export { loginControllers }