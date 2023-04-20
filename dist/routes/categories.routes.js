"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controllers_1 = require("../controllers/categories.controllers");
const ensuresCategoryExistsById_middlewares_1 = __importDefault(require("../middlewares/ensuresCategoryExistsById.middlewares"));
const ensuresCategoryNotExists_middlewares_1 = __importDefault(require("../middlewares/ensuresCategoryNotExists.middlewares"));
const ensuresDataIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresDataIsValid.middlewares"));
const ensuresTokenIsValid_middlewares_1 = __importDefault(require("../middlewares/ensuresTokenIsValid.middlewares"));
const ensuresUserIsAdmin_middlewares_1 = __importDefault(require("../middlewares/ensuresUserIsAdmin.middlewares"));
const category_schemas_1 = require("../schemas/category.schemas");
const categoryRouter = (0, express_1.Router)();
categoryRouter.post("", ensuresTokenIsValid_middlewares_1.default, ensuresUserIsAdmin_middlewares_1.default, (0, ensuresDataIsValid_middlewares_1.default)(category_schemas_1.categorySchema), ensuresCategoryNotExists_middlewares_1.default, categories_controllers_1.createCategoryController);
categoryRouter.get("", categories_controllers_1.listCategoriesController);
categoryRouter.get("/:id/realEstate", ensuresCategoryExistsById_middlewares_1.default, categories_controllers_1.listRealEstateByCategoryController);
exports.default = categoryRouter;
