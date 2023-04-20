"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnMultipleRealEstateSchema = exports.returnRealEstateSchema = exports.realEstateSchema = exports.addressSchema = void 0;
const zod_1 = require("zod");
const addressSchema = zod_1.z.object({
    street: zod_1.z.string().min(3).max(45),
    zipCode: zod_1.z.string().max(8),
    number: zod_1.z.string().max(7).nullish(),
    city: zod_1.z.string().min(2).max(20),
    state: zod_1.z.string().max(2)
});
exports.addressSchema = addressSchema;
const realEstateSchema = zod_1.z.object({
    value: zod_1.z.number().or(zod_1.z.string()),
    size: zod_1.z.number().positive(),
    address: addressSchema,
    categoryId: zod_1.z.number().optional(),
});
exports.realEstateSchema = realEstateSchema;
const returnAddressSchema = addressSchema.extend({
    id: zod_1.z.number()
});
const returnRealEstateSchema = realEstateSchema.extend({
    id: zod_1.z.number(),
    sold: zod_1.z.boolean(),
    category: zod_1.z.object({
        id: zod_1.z.number(),
        name: zod_1.z.string()
    }).nullable(),
    address: returnAddressSchema,
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string()
}).omit({ categoryId: true });
exports.returnRealEstateSchema = returnRealEstateSchema;
const returnMultipleRealEstateSchema = zod_1.z.object({
    id: zod_1.z.number(),
    value: zod_1.z.string().or(zod_1.z.number()),
    size: zod_1.z.number(),
    sold: zod_1.z.boolean(),
    address: returnAddressSchema,
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string()
}).array();
exports.returnMultipleRealEstateSchema = returnMultipleRealEstateSchema;
