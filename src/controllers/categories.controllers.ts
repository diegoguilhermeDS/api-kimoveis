import { Request, Response } from "express"
import { iCategoryRequest } from "../interfaces/category.interfaces"
import createCategoryService from "../services/categories/createCategory.services"
import listCategoriesService from "../services/categories/listCategories.services"
import listRealEstateByCategoryService from "../services/categories/listRealEstateByCategory.services"

const createCategoryController = async (req: Request, res: Response) => {

    const categoryData: iCategoryRequest = req.body

    const newCategory = await createCategoryService(categoryData)

    res.status(201).json(newCategory)
}

const listCategoriesController = async (req: Request, res: Response) => {

    const categories = await listCategoriesService()

    res.json(categories)
}

const listRealEstateByCategoryController = async (req: Request, res: Response) => {

    const categoryId = parseInt(req.params.id)

    const listRealEstate = await listRealEstateByCategoryService(categoryId)

    return res.json(listRealEstate)
}

export {
    createCategoryController,
    listCategoriesController,
    listRealEstateByCategoryController
}