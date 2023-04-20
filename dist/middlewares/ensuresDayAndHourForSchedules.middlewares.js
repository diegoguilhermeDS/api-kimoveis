"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const ensuresDayAndHourForSchedule = (req, res, next) => {
    const date = new Date(`${req.body.date}, ${req.body.hour}`);
    const day = date.getDay();
    const hour = date.getHours();
    if (day > 4) {
        throw new errors_1.AppError("Invalid date, work days are monday to friday");
    }
    if (hour < 8 || hour > 18) {
        throw new errors_1.AppError("Invalid hour, available times are 8AM to 18PM");
    }
    return next();
};
exports.default = ensuresDayAndHourForSchedule;
