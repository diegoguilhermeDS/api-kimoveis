import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Address, RealEstate } from "../entities";
import { AppError } from "../errors";
import { iAddressRepository, iRealEstateRepository } from "../interfaces/realEstate.interfaces";

const ensuresRealEstateNotExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const addressRepository: iAddressRepository = AppDataSource.getRepository(Address)

    const findAddress = await addressRepository.count({
        where: {
            street: req.body.address.street,
            zipCode: req.body.address.zipCode
        }
    })
    
    if(findAddress){
        throw new AppError("Address already exists", 409)
    }
    
    return next()
}

export default ensuresRealEstateNotExists