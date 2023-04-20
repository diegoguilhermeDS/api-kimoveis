"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnMultipleUserSchema = exports.returnUserSchema = exports.updateUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(45),
    email: zod_1.z.string().email().max(45),
    password: zod_1.z.string().min(4).max(20),
    admin: zod_1.z.boolean().default(false)
});
exports.userSchema = userSchema;
const updateUserSchema = userSchema.omit({ admin: true }).partial();
exports.updateUserSchema = updateUserSchema;
const returnUserSchema = userSchema.extend({
    id: zod_1.z.number(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    deletedAt: zod_1.z.string().nullable()
}).omit({ password: true });
exports.returnUserSchema = returnUserSchema;
const returnMultipleUserSchema = returnUserSchema.array();
exports.returnMultipleUserSchema = returnMultipleUserSchema;
