import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { iCategoryRepository, iCategoryReturn } from "../../interfaces/category.interfaces";
import { iRealEstateRequest, iAddressRepository, iRealEstateRepository, iRealestateReturn } from "../../interfaces/realEstate.interfaces";
import { returnRealEstateSchema } from "../../schemas/realEstate.schemas";

const createRealEstateService = async (realEstateData: iRealEstateRequest): Promise<iRealestateReturn> => {

    const addressRepository: iAddressRepository = AppDataSource.getRepository(Address)
    const realEstateRepository: iRealEstateRepository = AppDataSource.getRepository(RealEstate)
    const categoryRepository: iCategoryRepository = AppDataSource.getRepository(Category)

    let category: iCategoryReturn | null

    if(realEstateData.categoryId){
        category = await categoryRepository.findOneBy({id: realEstateData.categoryId})
    } else {
        category = null
    }

    const address = addressRepository.create(realEstateData.address)

    await addressRepository.save(address)

    const realEstate = realEstateRepository.create({
        ...realEstateData,
        address: address,
        category: category!
    })  

    await realEstateRepository.save(realEstate)

    const newRealEstate = returnRealEstateSchema.parse(realEstate)

    return newRealEstate
}

export default createRealEstateService