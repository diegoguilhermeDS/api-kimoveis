import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCategoryRepository, iRealEstatesByCategory } from "../../interfaces/category.interfaces";
import { returnRealEstateByCategorySchema } from "../../schemas/category.schemas";

const listRealEstateByCategoryService = async (
  categoryId: number
): Promise<iRealEstatesByCategory> => {
  const categoryRepository: iCategoryRepository =
    AppDataSource.getRepository(Category);

  const realEstates = await categoryRepository.findOne({
    where: { id: categoryId },
    relations: {
      realEstate: true,
    },
  });

  const realEstatesReturn = returnRealEstateByCategorySchema.parse(realEstates)

  return realEstatesReturn
};

export default listRealEstateByCategoryService;
