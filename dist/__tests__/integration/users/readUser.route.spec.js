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
const mocks_1 = require("../../mocks");
describe('GET /users', () => {
    let connection;
    const baseUrl = '/users';
    let readUsers;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            connection = res;
            readUsers = (yield mocks_1.readUserRouteMock.readUsers()).map((_a) => {
                var { password } = _a, payload = __rest(_a, ["password"]);
                return payload;
            });
        }))
            .catch((error) => console.error(error));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Must be able list all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(baseUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(true, 1)}`)
            .send();
        const expectResults = {
            status: 200,
            expectBody: readUsers,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expectResults.expectBody);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.not.objectContaining({ password: expect.any(String) }),
        ]));
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                deletedAt: null,
            }),
        ]));
    }));
    it('Error: Must not be able list all users: Missing token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(baseUrl).send();
        expect(response.status).toBe(mocks_1.errorsMock.missingBearer.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.missingBearer.error);
    }));
    it('Error: Must not be able list all users: User not admin', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(baseUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(false, 1)}`)
            .send();
        expect(response.status).toBe(mocks_1.errorsMock.forbidden.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.forbidden.error);
    }));
    it('Error: Must not be able list all users: Invalid signature', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(baseUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.invalidSignature}`)
            .send();
        expect(response.status).toBe(mocks_1.errorsMock.invalidSignature.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.invalidSignature.error);
    }));
    it('Error: Must not be able list all users: JWT malformed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(baseUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.jwtMalformed}`)
            .send();
        expect(response.status).toBe(mocks_1.errorsMock.jwtMalformed.status);
        expect(response.body).toStrictEqual(mocks_1.errorsMock.jwtMalformed.error);
    }));
});
