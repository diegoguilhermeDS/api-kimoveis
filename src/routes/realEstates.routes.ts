import { Router } from "express";
import { createRealEstateController, listRealEstatesController } from "../controllers/realEstates.controllers";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import ensuresRealEstateNotExists from "../middlewares/ensuresRealEstateNotExists.middlewares";
import ensuresTokenIsValid from "../middlewares/ensuresTokenIsValid.middlewares";
import ensuresUserIsAdmin from "../middlewares/ensuresUserIsAdmin.middlewares";
import { realEstateSchema } from "../schemas/realEstate.schemas";

const realEstatesRouter: Router = Router()

realEstatesRouter.post("", ensuresTokenIsValid, ensuresUserIsAdmin, ensuresDataISValid(realEstateSchema), ensuresRealEstateNotExists, createRealEstateController)
realEstatesRouter.get("", listRealEstatesController)

export default realEstatesRouter