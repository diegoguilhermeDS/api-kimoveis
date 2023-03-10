import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedule.services";
import listSchedulesByRealEstateService from "../services/schedules/listSchedulesByRealEstate.services";

const createScheduleController = async (req: Request, res: Response) => {
    const scheduleData = req.body
    const userId = req.user.id

    const scheduleStatus = await createScheduleService(scheduleData, userId)

    return res.status(201).json({message: scheduleStatus})
}

const listSchedulesByRealEstateController = async (req: Request, res: Response) => {

    const realEstateId = parseInt(req.params.id)

    const schedulesRealEstate = await listSchedulesByRealEstateService(realEstateId)

    return res.json(schedulesRealEstate)
}

export {
    createScheduleController,
    listSchedulesByRealEstateController
}