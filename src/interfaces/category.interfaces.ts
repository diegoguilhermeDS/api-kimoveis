import { z } from "zod";
import { categorySchema, returnMultipleCategorySchema } from "../schemas/category.schemas";

type iCategoryRequest = z.infer<typeof categorySchema>
type iCategoriesReturn = z.infer<typeof returnMultipleCategorySchema>