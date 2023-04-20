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
exports.deleteUserController = exports.updateUserController = exports.listUsersController = exports.createUserController = void 0;
const createUser_services_1 = __importDefault(require("../services/users/createUser.services"));
const deleteUser_services_1 = __importDefault(require("../services/users/deleteUser.services"));
const listUsers_services_1 = __importDefault(require("../services/users/listUsers.services"));
const updateUser_services_1 = __importDefault(require("../services/users/updateUser.services"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const user = yield (0, createUser_services_1.default)(userData);
    return res.status(201).json(user);
});
exports.createUserController = createUserController;
const listUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, listUsers_services_1.default)();
    return res.json(users);
});
exports.listUsersController = listUsersController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserData = req.body;
    const userId = parseInt(req.params.id);
    const newUser = yield (0, updateUser_services_1.default)(newUserData, userId);
    return res.json(newUser);
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, deleteUser_services_1.default)(parseInt(req.params.id));
    return res.status(204).json();
});
exports.deleteUserController = deleteUserController;
