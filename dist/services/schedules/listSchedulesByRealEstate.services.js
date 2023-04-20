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
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const listSchedulesByRealEstateService = (realEstateId) => __awaiter(void 0, void 0, void 0, function* () {
    const schedulesRealEstate = yield data_source_1.AppDataSource.createQueryBuilder(entities_1.RealEstate, "real_estate").
        innerJoinAndSelect("real_estate.address", "address").
        innerJoinAndSelect("real_estate.category", "category").
        innerJoinAndSelect("real_estate.schedules", "schedules").
        innerJoinAndSelect("schedules.user", "user").
        where("real_estate.id = :id", { id: realEstateId }).
        getOne();
    return schedulesRealEstate;
});
exports.default = listSchedulesByRealEstateService;
