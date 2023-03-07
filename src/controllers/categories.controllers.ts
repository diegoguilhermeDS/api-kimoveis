import { Request, Response } from "express"
import { iCategoryRequest } from "../interfaces/category.interfaces"
import createCategoryService from "../services/categories/createCategory.services"
import listCategoriesService from "../services/categories/listCategories.services"

const createCategoryController = async (req: Request, res: Response) => {

    const categoryData: iCategoryRequest = req.body

    const newCategory = await createCategoryService(categoryData)

    res.status(201).json(newCategory)
}

const listCategoriesController = async (req: Request, res: Response) => {

    const categories = await listCategoriesService()

    res.json(categories)
}

export {
    createCategoryController,
    listCategoriesController
}