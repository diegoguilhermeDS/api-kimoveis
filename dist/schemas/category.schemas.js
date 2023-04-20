"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRealEstateByCategorySchema = exports.returnMultipleCategorySchema = exports.returnCategory = exports.categorySchema = void 0;
const zod_1 = require("zod");
const categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(45),
});
exports.categorySchema = categorySchema;
const returnCategory = categorySchema.extend({
    id: zod_1.z.number(),
});
exports.returnCategory = returnCategory;
const returnRealEstateByCategorySchema = returnCategory.extend({
    realEstate: zod_1.z.object({
        id: zod_1.z.number(),
        value: zod_1.z.string().or(zod_1.z.number()),
        size: zod_1.z.number(),
        sold: zod_1.z.boolean(),
        createdAt: zod_1.z.string(),
        updatedAt: zod_1.z.string()
    }).array()
});
exports.returnRealEstateByCategorySchema = returnRealEstateByCategorySchema;
const returnMultipleCategorySchema = returnCategory.array();
exports.returnMultipleCategorySchema = returnMultipleCategorySchema;
