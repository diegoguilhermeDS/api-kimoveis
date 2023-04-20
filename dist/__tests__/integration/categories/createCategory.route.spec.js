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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const data_source_1 = require("../../../data-source");
const entities_1 = require("../../../entities");
const mocks_1 = require("../../mocks");
describe('POST /categories', () => {
    let connection;
    const baseUrl = '/categories';
    const categoryRepo = data_source_1.AppDataSource.getRepository(entities_1.Category);
    const adminToken = mocks_1.tokenMock.genToken(true, 1);
    const userToken = mocks_1.tokenMock.genToken(false, 2);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield categoryRepo.find();
        yield categoryRepo.remove(categories);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Must be able to create a category - Admin token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(mocks_1.createCategoryRouteMock.category);
        const expectResults = {
            status: 201,
            bodyEqual: expect.objectContaining(Object.assign(Object.assign({}, mocks_1.createCategoryRouteMock.category), { id: expect.any(Number) })),
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyEqual);
    }));
    it('Error: Must be able to create a category - Unique name', () => __awaiter(void 0, void 0, void 0, function* () {
        yield categoryRepo.save(mocks_1.createCategoryRouteMock.categoryUnique);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${adminToken}`)
            .send(mocks_1.createCategoryRouteMock.categoryUnique);
        const expectResults = {
            status: 409,
            bodyEqual: { message: 'Category already exists' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyEqual);
    }));
    it('Error: Must be able to create a category - User token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userToken}`)
            .send(mocks_1.createCategoryRouteMock.category);
        expect(response.status).toBe(mocks_1.errorsMock.forbidden.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.forbidden.error);
    }));
    it('Error: Must be able to create a category - Missing bearer', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createCategoryRouteMock.category);
        expect(response.status).toBe(mocks_1.errorsMock.missingBearer.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.missingBearer.error);
    }));
    it('Error: Must be able to create a category - Invalid signature', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.invalidSignature}`)
            .send(mocks_1.createCategoryRouteMock.category);
        expect(response.status).toBe(mocks_1.errorsMock.invalidSignature.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.invalidSignature.error);
    }));
    it('Error: Must be able to create a category - JWT malformed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.jwtMalformed}`)
            .send(mocks_1.createCategoryRouteMock.category);
        expect(response.status).toBe(mocks_1.errorsMock.jwtMalformed.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.jwtMalformed.error);
    }));
});
