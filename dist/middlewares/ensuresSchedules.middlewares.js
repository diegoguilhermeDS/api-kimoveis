"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const ensuresShedule = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userId = req.user.id;
    const userRespository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const realEstateRespository = data_source_1.AppDataSource.getRepository(entities_1.RealEstate);
    const realEstateSchedules = yield realEstateRespository.createQueryBuilder("real_estate").
        select(["real_estate", "schedules_re"]).
        innerJoin("real_estate.schedules", "schedules_re").
        where("real_estate.id = :id", { id: data.realEstateId }).
        andWhere("schedules_re.date = :date", { date: data.date }).
        andWhere("schedules_re.hour = :hour", { hour: data.hour }).
        getOne();
    if (realEstateSchedules) {
        throw new errors_1.AppError("Schedule to this real estate at this date and time already exists", 409);
    }
    const userSchedules = yield userRespository.createQueryBuilder("users").
        select(["users", "schedules_us"]).
        innerJoin("users.schedules", "schedules_us").
        where("users.id = :id", { id: userId }).
        andWhere("schedules_us.date = :date", { date: data.date }).
        andWhere("schedules_us.hour = :hour", { hour: data.hour }).
        getOne();
    if (userSchedules) {
        throw new errors_1.AppError("User schedule to this real estate at this date and time already exists", 409);
    }
    return next();
});
exports.default = ensuresShedule;
