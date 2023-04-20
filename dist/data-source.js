"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const dataSourceConfig = () => {
    const entitiesPath = path_1.default.join(__dirname, "./entities/**.{ts,js}");
    const migrationPath = path_1.default.join(__dirname, "./migrations/**.{ts,js}");
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        throw new Error("Env var DATABASE_URL does not exists");
    }
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath]
        };
    }
    return {
        type: "postgres",
        url: dbUrl,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationPath]
    };
};
const AppDataSource = new typeorm_1.DataSource(dataSourceConfig());
exports.AppDataSource = AppDataSource;
