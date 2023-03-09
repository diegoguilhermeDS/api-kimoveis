import { Router } from "express";
import { createCategoryController, listCategoriesController, listRealEstateByCategoryController } from "../controllers/categories.controllers";
import ensuresCategoryExistsById from "../middlewares/ensuresCategoryExistsById.middlewares";
import ensuresCategoryNotExists from "../middlewares/ensuresCategoryNotExists.middlewares";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import ensuresTokenIsValid from "../middlewares/ensuresTokenIsValid.middlewares";
import ensuresUserIsAdmin from "../middlewares/ensuresUserIsAdmin.middlewares";
import { categorySchema } from "../schemas/category.schemas";

const categoryRouter: Router = Router()

categoryRouter.post("", ensuresTokenIsValid, ensuresUserIsAdmin, ensuresDataISValid(categorySchema), ensuresCategoryNotExists, createCategoryController)
categoryRouter.get("", listCategoriesController)
categoryRouter.get("/:id/realEstate", ensuresCategoryExistsById, listRealEstateByCategoryController)

export default categoryRouter