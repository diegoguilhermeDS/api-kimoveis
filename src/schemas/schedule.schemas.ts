import { z } from "zod";
import { returnCategory } from "./category.schemas";
import { returnRealEstateSchema } from "./realEstate.schemas";
import { returnUserSchema } from "./users.schemas"

const scheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const returnScheduleSchema = scheduleSchema.extend({
  id: z.number(),
  userId: z.number(),
});

export { scheduleSchema, returnScheduleSchema };
