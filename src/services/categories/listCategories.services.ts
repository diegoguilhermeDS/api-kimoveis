import { AppDataSource } from "../../data-source"
import { Category } from "../../entities"
import { iCategoriesReturn, iCategoryRepository } from "../../interfaces/category.interfaces"

const listCategoriesService = async (): Promise<iCategoriesReturn> => {

    const categoryRepository: iCategoryRepository = AppDataSource.getRepository(Category)

    const categories = await categoryRepository.find()

    return categories
}

export default listCategoriesService