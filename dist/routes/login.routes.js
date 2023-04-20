"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controllers_1 = require("../controllers/login.controllers");
const ensuresDataIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresDataIsValid.middlewares"));
const login_schemas_1 = require("../schemas/login.schemas");
const loginRouter = (0, express_1.Router)();
loginRouter.post("", (0, ensuresDataIsValid_middlewares_1.default)(login_schemas_1.loginSchema), login_controllers_1.loginControllers);
exports.default = loginRouter;
