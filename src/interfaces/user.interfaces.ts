import { z } from "zod";
import { returnMultipleUserSchema, returnUserSchema, updateUserSchema, userSchema } from "../schemas/user.schemas";

type iUserRequest = z.infer<typeof userSchema>
type iUserReturn = z.infer<typeof returnUserSchema>
type iUsersReturn = z.infer<typeof returnMultipleUserSchema>
type iUserUpdate = z.infer<typeof updateUserSchema>

export {
    iUserRequest,
    iUserReturn,
    iUsersReturn,
    iUserUpdate
}