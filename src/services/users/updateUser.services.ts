import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { iUserRepository, iUserReturn, iUserUpdate } from "../../interfaces/users.interfaces"
import { returnUserSchema } from "../../schemas/users.schemas"

const updateUserService = async (newUSerData: iUserUpdate, userId: number): Promise<iUserReturn> => {
    
    const userRepository: iUserRepository = AppDataSource.getRepository(User)

    const oldUserData = await userRepository.findOneBy({id: userId})

    const user = userRepository.create({
        ...oldUserData,
        ...newUSerData
    })

    await userRepository.save(user)

    const newUser = returnUserSchema.parse(user)

    return newUser

}

export default updateUserService