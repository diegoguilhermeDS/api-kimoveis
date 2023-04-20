"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedules_controllers_1 = require("../controllers/schedules.controllers");
const ensuresDataIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresDataIsValid.middlewares"));
const ensuresDayAndHourForSchedules_middlewares_1 = __importDefault(require("../middlewares/ensuresDayAndHourForSchedules.middlewares"));
const ensuresRealEstateExists_middlewares_1 = __importDefault(require("../middlewares/ensuresRealEstateExists.middlewares"));
const ensuresSchedules_middlewares_1 = __importDefault(require("../middlewares/ensuresSchedules.middlewares"));
const ensuresTokenIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresTokenIsValid.middlewares"));
const ensuresUserIsAdmin_middlewares_1 = __importDefault(require("../middlewares/ensuresUserIsAdmin.middlewares"));
const schedule_schemas_1 = require("../schemas/schedule.schemas");
const schedulesRouter = (0, express_1.Router)();
schedulesRouter.post("", ensuresTokenIsValid_middlewares_1.default, (0, ensuresDataIsValid_middlewares_1.default)(schedule_schemas_1.scheduleSchema), ensuresDayAndHourForSchedules_middlewares_1.default, ensuresSchedules_middlewares_1.default, schedules_controllers_1.createScheduleController);
schedulesRouter.get("/realEstate/:id", ensuresTokenIsValid_middlewares_1.default, ensuresUserIsAdmin_middlewares_1.default, ensuresRealEstateExists_middlewares_1.default, schedules_controllers_1.listSchedulesByRealEstateController);
exports.default = schedulesRouter;
