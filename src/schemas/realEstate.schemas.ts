import { z } from "zod";

const addressSchema = z.object({
    street: z.string().min(3).max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7).nullish(),
    city: z.string().min(2).max(20),
    state: z.string().max(2)
})

const realEstateSchema = z.object({
    value: z.number().or(z.string()),
    size: z.number().positive(),
    address: addressSchema,
    categoryId: z.number().optional(),
})

const returnAddressSchema = addressSchema.extend({
    id: z.number()
})


const returnRealEstateSchema = realEstateSchema.extend({
    id: z.number(),
    sold: z.boolean(),
    category: z.object({
        id: z.number(),
        name: z.string()
    }).nullable(),
    address: returnAddressSchema,
    createdAt: z.string(),
    updatedAt: z.string()
}).omit({categoryId: true})

const returnMultipleRealEstateSchema =  z.object({
    id: z.number(),
    value: z.string().or(z.number()),
    size: z.number(),
    sold: z.boolean(),
    address: returnAddressSchema,
    createdAt: z.string(),
    updatedAt: z.string()
}).array()

export {
    addressSchema,
    realEstateSchema,
    returnRealEstateSchema,
    returnMultipleRealEstateSchema
}