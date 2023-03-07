import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { iUserRepository } from "../../interfaces/users.interfaces"

const deleteUserService = async (userId: number): Promise<void> => {

    const userRepository: iUserRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id: userId})

    await userRepository.softRemove(user!)

}

export default deleteUserService