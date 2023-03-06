import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { iUserRepository, iUsersReturn } from "../../interfaces/users.interfaces"
import { returnMultipleUserSchema } from "../../schemas/users.schemas"

const listUserService = async (): Promise<iUsersReturn> => {

    const userRepository: iUserRepository = AppDataSource.getRepository(User)

    const findUsers: Array<User> = await userRepository.find({
        withDeleted: true
    })

    const users = returnMultipleUserSchema.parse(findUsers)

    return users
}

export default listUserService