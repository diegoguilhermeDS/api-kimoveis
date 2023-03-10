import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { iCategoryRequest, iCategoryRepository, iCategoryReturn } from "../../interfaces/category.interfaces"

const createCategoryService = async (categoryData: iCategoryRequest): Promise<iCategoryReturn> => {

    const categoryRepository: iCategoryRepository = AppDataSource.getRepository(Category)

    const category = categoryRepository.create(categoryData)

    await categoryRepository.save(category)

    return category

}

export default createCategoryService