import { number, z } from "zod";
import { hashSync } from "bcryptjs";

const userSchema = z.object({
    name: z.string().min(3).max(45),
    email: z.string().email().min(10).max(45),
    password: z.string().min(4).max(20).transform((pass) => hashSync(pass, 10)),
    admin: z.boolean().default(false)
})

const updateUserSchema = userSchema.omit({admin: true}).partial()

const returnUserSchema = userSchema.extend({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable()
}).omit({password: true})

const returnMultipleUserSchema = returnUserSchema.array()

export {
    userSchema,
    updateUserSchema,
    returnUserSchema,
    returnMultipleUserSchema
}