import { number, z } from "zod";

const categorySchema = z.object({
    name: z.string().min(3).max(45)
})

const returnCategory = categorySchema.extend({
    id: z.number()
})

const returnMultipleCategorySchema = returnCategory.array()

export {
    categorySchema,
    returnCategory,
    returnMultipleCategorySchema
}