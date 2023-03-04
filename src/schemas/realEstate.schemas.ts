import { z } from "zod";

const addressSchema = z.object({
    street: z.string().min(3).max(45),
    zipCode: z.string().length(8),
    number: z.string().max(6).optional(),
    city: z.string().min(2).max(20),
    state: z.string().length(2)
})

const realEstateSchema = z.object({
    value: z.number(),
    size: z.number(),
    address: addressSchema,
    categoryId: z.number().optional(),
})

const returnRealEstateSchema = realEstateSchema.extend({
    id: z.number(),
    sold: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date()
})

const returnMultipleRealEstateSchema = returnRealEstateSchema.array()

export {
    addressSchema,
    realEstateSchema,
    returnRealEstateSchema,
    returnMultipleRealEstateSchema
}