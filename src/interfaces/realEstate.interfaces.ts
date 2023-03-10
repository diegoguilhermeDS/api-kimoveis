import { Repository } from "typeorm";
import { z } from "zod";
import { Address, RealEstate } from "../entities";
import { addressSchema, realEstateSchema, returnMultipleRealEstateSchema, returnRealEstateSchema } from "../schemas/realEstate.schemas";

type iAddress = z.infer<typeof addressSchema>
type iRealEstateRequest = z.infer<typeof realEstateSchema>
type iRealestateReturn = z.infer<typeof returnRealEstateSchema>
type iRealEstatesReturn = z.infer<typeof returnMultipleRealEstateSchema>
type iRealEstateRepository = Repository<RealEstate>
type iAddressRepository = Repository<Address>

export {
    iAddress,
    iRealEstateRequest,
    iRealestateReturn,
    iRealEstatesReturn,
    iRealEstateRepository,
    iAddressRepository
}