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
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const realEstate_schemas_1 = require("../../schemas/realEstate.schemas");
const createRealEstateService = (realEstateData) => __awaiter(void 0, void 0, void 0, function* () {
    const addressRepository = data_source_1.AppDataSource.getRepository(entities_1.Address);
    const realEstateRepository = data_source_1.AppDataSource.getRepository(entities_1.RealEstate);
    const categoryRepository = data_source_1.AppDataSource.getRepository(entities_1.Category);
    let category;
    if (realEstateData.categoryId) {
        category = yield categoryRepository.findOneBy({ id: realEstateData.categoryId });
    }
    else {
        category = null;
    }
    const address = addressRepository.create(realEstateData.address);
    yield addressRepository.save(address);
    const realEstate = realEstateRepository.create(Object.assign(Object.assign({}, realEstateData), { address: address, category: category }));
    yield realEstateRepository.save(realEstate);
    const newRealEstate = realEstate_schemas_1.returnRealEstateSchema.parse(realEstate);
    return newRealEstate;
});
exports.default = createRealEstateService;
