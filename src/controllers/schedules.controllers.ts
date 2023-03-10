import { Request, Response } from "express";
import createScheduleService from "../services/schedules/createSchedule.services";

const createScheduleController = async (req: Request, res: Response) => {
    const scheduleData = req.body
    const userId = req.user.id

    const scheduleStatus = await createScheduleService(scheduleData, userId)

    return res.status(201).json({message: scheduleStatus})
}

export {
    createScheduleController
}