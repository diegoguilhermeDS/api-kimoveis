import { z } from "zod";
import { returnScheduleSchema, scheduleSchema } from "../schemas/schedule.schemas";

type iScheduleRequest = z.infer<typeof scheduleSchema>
type iScheduleReturn = z.infer<typeof returnScheduleSchema>

export { iScheduleRequest, iScheduleReturn }