import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { RealEstate } from "../entities";
import { AppError } from "../errors";
import { iRealEstateRepository } from "../interfaces/realEstate.interfaces";

const ensuresRealEstateNotExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const realEstateRepository: iRealEstateRepository = AppDataSource.getRepository(RealEstate)

    const findRealEstate = await realEstateRepository.findOneBy({address: req.body.address})
    console.log(findRealEstate);
    
    if(findRealEstate){
        throw new AppError("Address already exists", 409)
    }
    
    return next()
}

export default ensuresRealEstateNotExists