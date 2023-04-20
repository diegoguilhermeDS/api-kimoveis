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
exports.listRealEstateByCategoryController = exports.listCategoriesController = exports.createCategoryController = void 0;
const createCategory_services_1 = __importDefault(require("../services/categories/createCategory.services"));
const listCategories_services_1 = __importDefault(require("../services/categories/listCategories.services"));
const listRealEstateByCategory_services_1 = __importDefault(require("../services/categories/listRealEstateByCategory.services"));
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = req.body;
    const newCategory = yield (0, createCategory_services_1.default)(categoryData);
    res.status(201).json(newCategory);
});
exports.createCategoryController = createCategoryController;
const listCategoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, listCategories_services_1.default)();
    res.json(categories);
});
exports.listCategoriesController = listCategoriesController;
const listRealEstateByCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryId = parseInt(req.params.id);
    const listRealEstate = yield (0, listRealEstateByCategory_services_1.default)(categoryId);
    return res.json(listRealEstate);
});
exports.listRealEstateByCategoryController = listRealEstateByCategoryController;
