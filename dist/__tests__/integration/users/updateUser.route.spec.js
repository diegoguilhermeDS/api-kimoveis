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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
describe('PATCH /users', () => {
    let connection;
    let updateAdminUrl;
    let updateUserUrl;
    const baseUrl = '/users';
    const updateInvalidIDUrl = baseUrl + '/123456';
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    let userAdmin;
    let userNotAdmin;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userRepo.find();
        yield userRepo.remove(users);
        userAdmin = yield userRepo.save(mocks_1.updateUserRouteMock.userAdminTemplate);
        userNotAdmin = yield userRepo.save(mocks_1.updateUserRouteMock.userNotAdminTemplate);
        updateAdminUrl = baseUrl + `/${userAdmin.id}`;
        updateUserUrl = baseUrl + `/${userNotAdmin.id}`;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Admin must be able to update a user - Admin token - Full body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateUserUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userAdmin.admin, userAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userComplete);
        const expectResults = {
            status: 200,
        };
        const _a = mocks_1.updateUserRouteMock.userComplete, { password } = _a, payload = __rest(_a, ["password"]);
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(Object.assign(Object.assign({}, payload), { id: userNotAdmin.id })));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
    }));
    it('Success: Admin must be able to self update - Admin token - Full body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userAdmin.admin, userAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userComplete);
        const expectResults = {
            status: 200,
        };
        const _b = mocks_1.updateUserRouteMock.userComplete, { password } = _b, payload = __rest(_b, ["password"]);
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(Object.assign(Object.assign({}, payload), { id: userAdmin.id })));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
    }));
    it('Success: User must be able to self update - User token - Full body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateUserUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userNotAdmin.admin, userNotAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userComplete);
        const expectResults = {
            status: 200,
        };
        const _c = mocks_1.updateUserRouteMock.userComplete, { password } = _c, payload = __rest(_c, ["password"]);
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(Object.assign(Object.assign({}, payload), { id: userNotAdmin.id })));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
    }));
    it('Success: Admin must be able to self update - Admin token - Partial', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userAdmin.admin, userAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userPartial);
        const expectResults = {
            status: 200,
        };
        const { password } = userAdmin, payload = __rest(userAdmin, ["password"]);
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(payload));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
    }));
    it('Success: User must be able to self update - User token - Partial', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateUserUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userAdmin.admin, userNotAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userPartial);
        const expectResults = {
            status: 200,
        };
        const { password } = userNotAdmin, payload = __rest(userNotAdmin, ["password"]);
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(payload));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
    }));
    it("Success: Admin must not be able to update 'admin' field - Admin token - Partial", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userAdmin.admin, userAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userAdmin);
        const expectResults = {
            status: 200,
        };
        const { password } = userAdmin, payload = __rest(userAdmin, ["password"]);
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(payload));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
    }));
    it("Success: User must not be able to update 'admin' field - Admin token - Partial", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateUserUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userNotAdmin.admin, userNotAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userAdmin);
        const expectResults = {
            status: 200,
        };
        const { password } = userNotAdmin, payload = __rest(userNotAdmin, ["password"]);
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(payload));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
    }));
    it('Error: User must not be able to update admin - User token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userNotAdmin.admin, userNotAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userComplete);
        expect(response.status).toBe(mocks_1.errorsMock.forbidden.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.forbidden.error);
    }));
    it('Error: Must not be able to update - Missing bearer', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateAdminUrl)
            .send(mocks_1.updateUserRouteMock.userComplete);
        expect(response.status).toBe(mocks_1.errorsMock.missingBearer.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.missingBearer.error);
    }));
    it('Error: Must not be able to update - Invalid signature', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.invalidSignature}`)
            .send(mocks_1.updateUserRouteMock.userComplete);
        expect(response.status).toBe(mocks_1.errorsMock.invalidSignature.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.invalidSignature.error);
    }));
    it('Error: Must not be able to update - JWT malformed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateAdminUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.jwtMalformed}`)
            .send(mocks_1.updateUserRouteMock.userComplete);
        expect(response.status).toBe(mocks_1.errorsMock.jwtMalformed.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.jwtMalformed.error);
    }));
    it('Error: Must not be able to update - Invalid ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(updateInvalidIDUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(userNotAdmin.admin, userNotAdmin.id)}`)
            .send(mocks_1.updateUserRouteMock.userComplete);
        expect(response.status).toBe(mocks_1.errorsMock.notFound.user.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.notFound.user.error);
    }));
});
