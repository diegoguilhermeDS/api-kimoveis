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
describe('DELETE /users', () => {
    let connection;
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const baseUrl = '/users';
    const destroyInvalidIDUrl = baseUrl + '/123456';
    let userAdmin;
    let userNotAdmin;
    let destroyAdminUrl;
    let destroyUserUrl;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userRepo.find();
        yield userRepo.remove(users);
        userAdmin = yield userRepo.save(mocks_1.destroyUserRouteMock.userAdminTemplate);
        userNotAdmin = yield userRepo.save(mocks_1.destroyUserRouteMock.userNotAdminTemplate);
        destroyAdminUrl = baseUrl + `/${userAdmin.id}`;
        destroyUserUrl = baseUrl + `/${userNotAdmin.id}`;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Admin must be able to destroy a user - Admin token - Full body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(destroyUserUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userAdmin.admin, userAdmin.id)}`);
        const expectResults = { status: 204 };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual({});
    }));
    it('Error: User must not be able to destroy admin - User token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(destroyAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userNotAdmin.admin, userNotAdmin.id)}`);
        expect(response.status).toBe(mocks_1.errorsMock.forbidden.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.forbidden.error);
    }));
    it('Error: Must not be able to destroy - Invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(destroyInvalidIDUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userNotAdmin.admin, userNotAdmin.id)}`);
        const expectResults = {
            status: 404,
            bodyEqual: { message: 'User not found' },
        };
        expect(response.status).toBe(mocks_1.errorsMock.notFound.user.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.notFound.user.error);
    }));
    it('Error: Must not be able to destroy - User soft deleted', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userRepo.softRemove(userNotAdmin);
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(destroyUserUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userAdmin.admin, userAdmin.id)}`);
        expect(response.status).toBe(mocks_1.errorsMock.notFound.user.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.notFound.user.error);
    }));
    it('Error: Must not be able to destroy - Missing bearer', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).delete(destroyAdminUrl);
        expect(response.status).toBe(mocks_1.errorsMock.missingBearer.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.missingBearer.error);
    }));
    it('Error: Must not be able to destroy - Invalid signature', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(destroyAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.invalidSignature}`);
        expect(response.status).toBe(mocks_1.errorsMock.invalidSignature.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.invalidSignature.error);
    }));
    it('Error: Must not be able to destroy - JWT malformed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .delete(destroyAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.jwtMalformed}`);
        expect(response.status).toBe(mocks_1.errorsMock.jwtMalformed.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.jwtMalformed.error);
    }));
});
