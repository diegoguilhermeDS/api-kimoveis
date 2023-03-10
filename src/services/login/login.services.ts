import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iLogin } from "../../interfaces/login.interfaces";
import { iUserRepository } from "../../interfaces/users.interfaces";
import "dotenv/config"

const loginService = async (loginData: iLogin): Promise<string> => {

    const userRepository: iUserRepository = AppDataSource.getRepository(User)

    const findUserByEmail = await userRepository.findOneBy({email: loginData.email}) 

    if(!findUserByEmail || findUserByEmail.deletedAt){
        throw new AppError("Invalid credentials", 401)
    }

    const validatePassword: boolean = await compare(loginData.password, findUserByEmail.password)
    
    if(!validatePassword){
        throw new AppError("Invalid credentials", 401)
    }

    const token: string = sign(
        {
            admin: findUserByEmail.admin,
            email: findUserByEmail.email
        },
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: String(findUserByEmail.id) }
    )

    return token
}

export default loginService