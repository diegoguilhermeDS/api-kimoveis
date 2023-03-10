import { Request, Response } from "express";
import { iRealEstateRequest } from "../interfaces/realEstate.interfaces";
import createRealEstateService from "../services/realEstates/createRealEstate.services";
import listRealEstatesService from "../services/realEstates/listRealEstates.services";

const createRealEstateController = async (req: Request, res: Response) => {

    const realEstateReq: iRealEstateRequest = req.body

    const realEstate = await createRealEstateService(realEstateReq)

    res.status(201).json(realEstate)
}

const listRealEstatesController = async (req: Request, res: Response) => {

    const realEstates = await listRealEstatesService()
    
    return res.json(realEstates)
}

export {
    createRealEstateController,
    listRealEstatesController
}