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
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const errors_1 = require("../../errors");
require("dotenv/config");
const loginService = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const findUserByEmail = yield userRepository.findOneBy({ email: loginData.email });
    if (!findUserByEmail || findUserByEmail.deletedAt) {
        throw new errors_1.AppError("Invalid credentials", 401);
    }
    const validatePassword = yield (0, bcryptjs_1.compare)(loginData.password, findUserByEmail.password);
    if (!validatePassword) {
        throw new errors_1.AppError("Invalid credentials", 401);
    }
    const token = (0, jsonwebtoken_1.sign)({
        admin: findUserByEmail.admin,
        email: findUserByEmail.email
    }, String(process.env.SECRET_KEY), { expiresIn: "24h", subject: String(findUserByEmail.id) });
    return token;
});
exports.default = loginService;
