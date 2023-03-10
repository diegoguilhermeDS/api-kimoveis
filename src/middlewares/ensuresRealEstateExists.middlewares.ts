import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { RealEstate } from "../entities"
import { AppError } from "../errors"
import { iRealEstateRepository } from "../interfaces/realEstate.interfaces"

const ensuresRealEstateExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const realEstateId = parseInt(req.params.id)

    const realEstateRepository: iRealEstateRepository = AppDataSource.getRepository(RealEstate)

    const findRealEstate = await realEstateRepository.findOneBy({id: realEstateId})

    if(!findRealEstate){
        throw new AppError("RealEstate not found", 404)
    }

    return next()
}

export default ensuresRealEstateExists