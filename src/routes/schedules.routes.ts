import { Router } from "express";
import { createScheduleController, listSchedulesByRealEstateController } from "../controllers/schedules.controllers";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import ensuresDayAndHourForSchedule from "../middlewares/ensuresDayAndHourForSchedules.middlewares";
import ensuresRealEstateExists from "../middlewares/ensuresRealEstateExists.middlewares";
import ensuresShedule from "../middlewares/ensuresSchedules.middlewares";
import ensuresTokenIsValid from "../middlewares/ensuresTokenIsValid.middlewares";
import ensuresUserIsAdmin from "../middlewares/ensuresUserIsAdmin.middlewares";
import { scheduleSchema } from "../schemas/schedule.schemas";

const schedulesRouter: Router = Router()

schedulesRouter.post("", ensuresTokenIsValid, ensuresDataISValid(scheduleSchema), ensuresDayAndHourForSchedule, ensuresShedule, createScheduleController)
schedulesRouter.get("/realEstate/:id", ensuresTokenIsValid, ensuresUserIsAdmin, ensuresRealEstateExists, listSchedulesByRealEstateController)

export default schedulesRouter