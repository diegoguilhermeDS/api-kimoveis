import { Request, Response } from "express";
import { iRealEstateRequest } from "../interfaces/realEstate.interfaces";
import createRealEstateService from "../services/realEstates/createRealEstate.services";

const createRealEstateController = async (req: Request, res: Response) => {

    const realEstateReq: iRealEstateRequest = req.body

    const realEstate = await createRealEstateService(realEstateReq)

    res.status(201).json(realEstate)
}

export {
    createRealEstateController
}