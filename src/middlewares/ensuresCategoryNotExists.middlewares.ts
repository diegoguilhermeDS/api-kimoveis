import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
import { iCategoryRepository, iCategoryRequest } from "../interfaces/category.interfaces";

const ensuresCategoryNotExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const catergoryData: iCategoryRequest = req.body

    const categoryRepository: iCategoryRepository = AppDataSource.getRepository(Category)

    const findCategory = await categoryRepository.findOneBy({name: catergoryData.name})

    if(findCategory){
        throw new AppError("Category already exists", 409)
    }

    return next()
}   

export default ensuresCategoryNotExists