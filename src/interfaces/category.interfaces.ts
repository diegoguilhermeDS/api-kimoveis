import { Repository } from "typeorm";
import { z } from "zod";
import { Category } from "../entities";
import { categorySchema, returnCategory, returnMultipleCategorySchema } from "../schemas/category.schemas";

type iCategoryRequest = z.infer<typeof categorySchema>
type iCategoryReturn = z.infer<typeof returnCategory>
type iCategoriesReturn = z.infer<typeof returnMultipleCategorySchema>
type iCategoryRepository = Repository<Category>

export { 
    iCategoryRequest,
    iCategoryReturn,
    iCategoriesReturn,
    iCategoryRepository
}