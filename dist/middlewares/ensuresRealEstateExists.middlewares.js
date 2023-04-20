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
const data_source_1 = require("../data-source");
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const ensuresRealEstateExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const realEstateId = parseInt(req.params.id);
    const realEstateRepository = data_source_1.AppDataSource.getRepository(entities_1.RealEstate);
    const findRealEstate = yield realEstateRepository.findOneBy({ id: realEstateId });
    if (!findRealEstate) {
        throw new errors_1.AppError("RealEstate not found", 404);
    }
    return next();
});
exports.default = ensuresRealEstateExists;
