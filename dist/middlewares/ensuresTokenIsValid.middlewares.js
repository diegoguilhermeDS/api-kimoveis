"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const ensuresTokenIsValid = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        throw new errors_1.AppError("Missing bearer token", 401);
    }
    token = token.split(" ")[1];
    jsonwebtoken_1.default.verify(token, String(process.env.SECRET_KEY), (error, decoded) => {
        if (error) {
            throw new errors_1.AppError(error.message, 401);
        }
        req.user = {
            id: Number(decoded.sub),
            admin: decoded.admin,
        };
        return next();
    });
};
exports.default = ensuresTokenIsValid;
