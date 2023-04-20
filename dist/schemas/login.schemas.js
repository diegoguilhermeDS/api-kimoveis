"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(10).max(45),
    password: zod_1.z.string().min(4).max(20)
});
exports.loginSchema = loginSchema;
