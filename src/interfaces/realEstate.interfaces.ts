import { z } from "zod";
import { addressSchema, realEstateSchema, returnMultipleRealEstateSchema, returnRealEstateSchema } from "../schemas/realEstate.schemas";

type iAddress = z.infer<typeof addressSchema>
type iRealEstateRequest = z.infer<typeof realEstateSchema>
type iRealestateReturn = z.infer<typeof returnRealEstateSchema>
type iRealEstatesReturn = z.infer<typeof returnMultipleRealEstateSchema>

export {
    iAddress,
    iRealEstateRequest,
    iRealestateReturn,
    iRealEstatesReturn
}