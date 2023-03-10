import { Repository } from "typeorm";
import { z } from "zod";
import { Schedule } from "../entities";
import { returnScheduleSchema, scheduleSchema } from "../schemas/schedule.schemas";

type iScheduleRequest = z.infer<typeof scheduleSchema>
type iScheduleReturn = z.infer<typeof returnScheduleSchema>
type iScheduleRepository = Repository<Schedule>

export { iScheduleRequest, iScheduleReturn, iScheduleRepository }