import { z } from "zod";

const categorySchema = z.object({
    name: z.string().min(3).max(45)
})

const returnMultipleCategorySchema = categorySchema.array()

export {
    categorySchema,
    returnMultipleCategorySchema
}