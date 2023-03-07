import { Request, Response } from "express"
import { iCategoryRequest } from "../interfaces/category.interfaces"
import createCategoryService from "../services/categories/createCategory.services"

const createCategoryController = async (req: Request, res: Response) => {

    const categoryData: iCategoryRequest = req.body

    const newCategory = await createCategoryService(categoryData)

    res.status(201).json(newCategory)
}

export {
    createCategoryController
}