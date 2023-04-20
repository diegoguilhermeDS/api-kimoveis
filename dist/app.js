"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
require("express-async-errors");
const errors_1 = require("./errors");
const categories_routes_1 = __importDefault(require("./routes/categories.routes"));
const login_routes_1 = __importDefault(require("./routes/login.routes"));
const realEstates_routes_1 = __importDefault(require("./routes/realEstates.routes"));
const schedules_routes_1 = __importDefault(require("./routes/schedules.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use("/users", users_routes_1.default);
app.use("/login", login_routes_1.default);
app.use("/categories", categories_routes_1.default);
app.use("/realEstate", realEstates_routes_1.default);
app.use("/schedules", schedules_routes_1.default);
app.use(errors_1.handleErrors);
exports.default = app;
