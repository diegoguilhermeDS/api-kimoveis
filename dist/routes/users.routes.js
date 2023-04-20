"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const ensuresDataIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresDataIsValid.middlewares"));
const ensuresEmailNotExist_middlewares_1 = __importDefault(require("../middlewares/ensuresEmailNotExist.middlewares"));
const ensuresIdUserNotExists_middlewares_1 = __importDefault(require("../middlewares/ensuresIdUserNotExists.middlewares"));
const ensuresTokenIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresTokenIsValid.middlewares"));
const ensuresUserIsAdmin_middlewares_1 = __importDefault(require("../middlewares/ensuresUserIsAdmin.middlewares"));
const users_schemas_1 = require("../schemas/users.schemas");
const usersRouter = (0, express_1.Router)();
usersRouter.post("", (0, ensuresDataIsValid_middlewares_1.default)(users_schemas_1.userSchema), ensuresEmailNotExist_middlewares_1.default, users_controllers_1.createUserController);
usersRouter.get("", ensuresTokenIsValid_middlewares_1.default, ensuresUserIsAdmin_middlewares_1.default, users_controllers_1.listUsersController);
usersRouter.patch("/:id", (0, ensuresDataIsValid_middlewares_1.default)(users_schemas_1.updateUserSchema), ensuresIdUserNotExists_middlewares_1.default, ensuresTokenIsValid_middlewares_1.default, ensuresUserIsAdmin_middlewares_1.default, users_controllers_1.updateUserController);
usersRouter.delete("/:id", ensuresIdUserNotExists_middlewares_1.default, ensuresTokenIsValid_middlewares_1.default, ensuresUserIsAdmin_middlewares_1.default, users_controllers_1.deleteUserController);
exports.default = usersRouter;
