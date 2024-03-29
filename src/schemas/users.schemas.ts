import { number, z } from "zod";
import { hashSync } from "bcryptjs";

const userSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email().max(45),
    password: z.string().min(4).max(20),
    admin: z.boolean().default(false)
})

const updateUserSchema = userSchema.omit({admin: true}).partial()

const returnUserSchema = userSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
}).omit({password: true})

const returnMultipleUserSchema = returnUserSchema.array()

export {
    userSchema,
    updateUserSchema,
    returnUserSchema,
    returnMultipleUserSchema
}