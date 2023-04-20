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
describe('POST /users', () => {
    let connection;
    const baseUrl = '/users';
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((error) => console.error(error));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield userRepo.find();
        yield userRepo.remove(users);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Must be able to create a user - Full body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createUserRouteMock.userComplete);
        const _a = mocks_1.createUserRouteMock.userComplete, { password } = _a, bodyEqual = __rest(_a, ["password"]);
        const expectResults = {
            status: 201,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(bodyEqual));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            deletedAt: null,
        }));
    }));
    it('Success: Must be able to create a user - Without "admin"', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createUserRouteMock.userWithoutAdmin);
        const _b = mocks_1.createUserRouteMock.userWithoutAdmin, { password } = _b, bodyEqual = __rest(_b, ["password"]);
        const expectResults = {
            status: 201,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expect.objectContaining(bodyEqual));
        expect(response.body).not.toEqual(expect.objectContaining({ password: expect.any(String) }));
        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            deletedAt: null,
            admin: false,
        }));
    }));
    it('Error: Must not be able to create a user - Email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        yield userRepo.save(mocks_1.createUserRouteMock.userUnique);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createUserRouteMock.userUnique);
        const expectResults = {
            status: 409,
            bodyMessage: { message: 'Email already exists' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyMessage);
    }));
    it('Error: Must not be able to create a user - Invalid body', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createUserRouteMock.userInvalidBody);
        const expectResults = {
            status: 400,
            bodyMessage: {
                message: {
                    name: ['Expected string, received number'],
                    email: ['Expected string, received array'],
                    password: ['Required'],
                },
            },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyMessage);
    }));
    it('Error: Must not be able to create a user - Invalid body 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createUserRouteMock.userInvalidBody2);
        const expectResults = {
            status: 400,
            bodyMessage: {
                message: {
                    name: ['String must contain at most 45 character(s)'],
                    email: ['Invalid email'],
                    password: ['Expected string, received number'],
                },
            },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyMessage);
    }));
});
