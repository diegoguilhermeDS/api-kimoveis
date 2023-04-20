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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSchedulesByRealEstateController = exports.createScheduleController = void 0;
const createSchedule_services_1 = __importDefault(require("../services/schedules/createSchedule.services"));
const listSchedulesByRealEstate_services_1 = __importDefault(require("../services/schedules/listSchedulesByRealEstate.services"));
const createScheduleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduleData = req.body;
    const userId = req.user.id;
    const scheduleStatus = yield (0, createSchedule_services_1.default)(scheduleData, userId);
    return res.status(201).json({ message: scheduleStatus });
});
exports.createScheduleController = createScheduleController;
const listSchedulesByRealEstateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const realEstateId = parseInt(req.params.id);
    const schedulesRealEstate = yield (0, listSchedulesByRealEstate_services_1.default)(realEstateId);
    return res.json(schedulesRealEstate);
});
exports.listSchedulesByRealEstateController = listSchedulesByRealEstateController;
