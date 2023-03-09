import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";
import { iCategoryRepository } from "../interfaces/category.interfaces";

const ensuresCategoryExistsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const idCategory = parseInt(req.params.id)

    const categoryRepository: iCategoryRepository = AppDataSource.getRepository(Category)

    const findCategory = await categoryRepository.findOneBy({id: idCategory})

    if(!findCategory){
        throw new AppError("Category not found", 404)
    }

    return next()
}

export default ensuresCategoryExistsById