"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const realEstates_controllers_1 = require("../controllers/realEstates.controllers");
const ensuresDataIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresDataIsValid.middlewares"));
const ensuresRealEstateNotExists_middlewares_1 = __importDefault(require("../middlewares/ensuresRealEstateNotExists.middlewares"));
const ensuresTokenIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresTokenIsValid.middlewares"));
const ensuresUserIsAdmin_middlewares_1 = __importDefault(require("../middlewares/ensuresUserIsAdmin.middlewares"));
const realEstate_schemas_1 = require("../schemas/realEstate.schemas");
const realEstatesRouter = (0, express_1.Router)();
realEstatesRouter.post("", ensuresTokenIsValid_middlewares_1.default, ensuresUserIsAdmin_middlewares_1.default, (0, ensuresDataIsValid_middlewares_1.default)(realEstate_schemas_1.realEstateSchema), ensuresRealEstateNotExists_middlewares_1.default, realEstates_controllers_1.createRealEstateController);
realEstatesRouter.get("", realEstates_controllers_1.listRealEstatesController);
exports.default = realEstatesRouter;
