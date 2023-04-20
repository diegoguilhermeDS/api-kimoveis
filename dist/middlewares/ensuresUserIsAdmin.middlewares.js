"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const ensuresUserIsAdmin = (req, res, next) => {
    const isAdmin = req.user.admin;
    const method = req.method;
    if (!isAdmin) {
        if (+req.params.id !== req.user.id || method === "DELETE") {
            throw new errors_1.AppError("Insufficient permission", 403);
        }
        if (req.baseUrl !== "/users") {
            throw new errors_1.AppError("Insufficient permission", 403);
        }
    }
    return next();
};
exports.default = ensuresUserIsAdmin;
