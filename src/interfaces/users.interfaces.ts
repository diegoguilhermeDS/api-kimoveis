import { Repository } from "typeorm";
import { z } from "zod";
import { User } from "../entities";
import { returnMultipleUserSchema, returnUserSchema, updateUserSchema, userSchema } from "../schemas/users.schemas";

type iUserRequest = z.infer<typeof userSchema>
type iUserReturn = z.infer<typeof returnUserSchema>
type iUsersReturn = z.infer<typeof returnMultipleUserSchema>
type iUserUpdate = z.infer<typeof updateUserSchema>
type iUserRepository = Repository<User>

export {
    iUserRequest,
    iUserReturn,
    iUsersReturn,
    iUserUpdate,
    iUserRepository
}