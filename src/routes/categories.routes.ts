import { Router } from "express";
import { createCategoryController } from "../controllers/categories.controllers";
import ensuresCategoryExists from "../middlewares/ensuresCategoryExists.middlewares";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import ensuresTokenIsValid from "../middlewares/ensuresTokenIsValid.middlewares";
import ensuresUserIsAdmin from "../middlewares/ensuresUserIsAdmin.middlewares";
import { categorySchema } from "../schemas/category.schemas";

const categoryRouter: Router = Router()

categoryRouter.post("", ensuresTokenIsValid, ensuresUserIsAdmin, ensuresDataISValid(categorySchema), ensuresCategoryExists, createCategoryController)

export default categoryRouter