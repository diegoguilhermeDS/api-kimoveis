import { z } from "zod";

const scheduleSchema = z.object({
    date: z.preprocess((data) => {
        if(typeof data === "string" || data instanceof Date){
            return new Date(data)
        }
    }, z.date().or(z.string())),
    hour: z.preprocess((data) => {
        if(typeof data === "string" || data instanceof Date){
            return new Date(data)
        }
    }, z.date().or(z.string())),
    propertieId: z.number()
})

const returnScheduleSchema = scheduleSchema.extend({
    id: z.number(),
    userId: z.number()
})

export { scheduleSchema, returnScheduleSchema }