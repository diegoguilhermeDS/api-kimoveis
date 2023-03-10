import { number, z } from "zod";
import { returnMultipleRealEstateSchema } from "./realEstate.schemas";

const categorySchema = z.object({
  name: z.string().min(3).max(45),
});

const returnCategory = categorySchema.extend({
  id: z.number(),
});

const returnRealEstateByCategorySchema = returnCategory.extend({
  realEstate: z.object({
    id: z.number(),
    value: z.string().or(z.number()),
    size: z.number(),
    sold: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string()
  }).array()
});

const returnMultipleCategorySchema = returnCategory.array();

export { categorySchema, returnCategory, returnMultipleCategorySchema, returnRealEstateByCategorySchema };
