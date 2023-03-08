import { AppDataSource } from "../../data-source"
import { RealEstate } from "../../entities"
import { iRealEstateRepository, iRealEstatesReturn } from "../../interfaces/realEstate.interfaces"
import { returnMultipleRealEstateSchema } from "../../schemas/realEstate.schemas"

const listRealEstatesService = async (): Promise<iRealEstatesReturn> => {

    const realEstateRepository: iRealEstateRepository = AppDataSource.getRepository(RealEstate)

    const realEstates = await realEstateRepository.find({
        relations: {
            address: true,
            category: true
        }
    })
    
    const ListRealEstate = returnMultipleRealEstateSchema.parse(realEstates)

    return ListRealEstate
}

export default listRealEstatesService