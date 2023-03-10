import { Router } from "express";
import { createScheduleController } from "../controllers/schedules.controllers";
import ensuresDataISValid from "../middlewares/ensuresDataIsValid.middlewares";
import ensuresDayAndHourForSchedule from "../middlewares/ensuresDayAndHourForSchedules.middlewares";
import ensuresEmailNotExists from "../middlewares/ensuresEmailNotExist.middlewares";
import ensuresShedule from "../middlewares/ensuresSchedules.middlewares";
import ensuresTokenIsValid from "../middlewares/ensuresTokenIsValid.middlewares";
import { scheduleSchema } from "../schemas/schedule.schemas";

const schedulesRouter: Router = Router()

schedulesRouter.post("", ensuresTokenIsValid, ensuresDataISValid(scheduleSchema), ensuresDayAndHourForSchedule, ensuresShedule, createScheduleController)

export default schedulesRouter