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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../../data-source");
const entities_1 = require("../../../entities");
const categoryRealStation = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    const categoryRepo = data_source_1.AppDataSource.getRepository(entities_1.Category);
    const category = yield categoryRepo.save({ name: 'Studio' });
    const realEstateRepo = data_source_1.AppDataSource.getRepository(entities_1.RealEstate);
    const addressRepo = data_source_1.AppDataSource.getRepository(entities_1.Address);
    const realEstateTotal = 5;
    const manyAddresses = Array.from(Array(realEstateTotal)).map((val, index) => {
        return {
            city: `city${index}`,
            street: `street${index}`,
            state: `s${index}`,
            zipCode: `zipCode${index}`,
            number: index.toString(),
        };
    });
    const manyRealEstate = [];
    try {
        for (var _d = true, manyAddresses_1 = __asyncValues(manyAddresses), manyAddresses_1_1; manyAddresses_1_1 = yield manyAddresses_1.next(), _a = manyAddresses_1_1.done, !_a;) {
            _c = manyAddresses_1_1.value;
            _d = false;
            try {
                const address = _c;
                const realEstateVal = Math.random() * 10000000;
                const addressCreate = yield addressRepo.save(address);
                manyRealEstate.push({
                    value: parseFloat(realEstateVal.toString()).toFixed(2),
                    size: Math.ceil(Math.random() * 100),
                    address: addressCreate,
                    category: { id: category.id },
                });
            }
            finally {
                _d = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_d && !_a && (_b = manyAddresses_1.return)) yield _b.call(manyAddresses_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    yield realEstateRepo
        .createQueryBuilder('rs')
        .insert()
        .values(manyRealEstate)
        .execute();
    return Object.assign(Object.assign({}, category), { realEstate: yield realEstateRepo.find() });
});
exports.default = { categoryRealStation };
