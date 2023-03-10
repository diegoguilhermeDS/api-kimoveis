import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensuresDayAndHourForSchedule = (req: Request, res: Response, next: NextFunction) => {

    const date = new Date(`${req.body.date}, ${req.body.hour}`)
    const day = date.getDay()
    const hour = date.getHours()
    
    if(day > 4){
        throw new AppError("Invalid date, work days are monday to friday")
    }

    if(hour < 8 || hour > 18){
        throw new AppError("Invalid hour, available times are 8AM to 18PM")
    }

    return next()
}

export default ensuresDayAndHourForSchedule