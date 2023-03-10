import { AppDataSource } from "../../data-source"
import { RealEstate } from "../../entities"

const listSchedulesByRealEstateService = async (realEstateId: number): Promise<RealEstate | null> => {

    const schedulesRealEstate = await AppDataSource.createQueryBuilder(RealEstate, "real_estate").
    innerJoinAndSelect("real_estate.address", "address").
    innerJoinAndSelect("real_estate.category", "category").
    innerJoinAndSelect("real_estate.schedules", "schedules").
    innerJoinAndSelect("schedules.user", "user").
    where("real_estate.id = :id", {id: realEstateId}).
    getOne()

    return schedulesRealEstate

}

export default listSchedulesByRealEstateService