"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = exports.AppError = void 0;
const zod_1 = require("zod");
class AppError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.AppError = AppError;
const handleErrors = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({ message: err.flatten().fieldErrors });
    }
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
};
exports.handleErrors = handleErrors;
