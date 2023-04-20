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
describe('POST /login', () => {
    let connection;
    const baseUrl = '/login';
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
    it('Success: Must be able to login', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userRepo.create(mocks_1.createSessionRouteMock.userActive);
        yield userRepo.save(user);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createSessionRouteMock.userActive);
        const expectResults = {
            status: 200,
            bodyEqual: { token: expect.any(String) },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyEqual);
    }));
    it('Error: Must not be able to login - Invalid credential 1 - Wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userRepo.create(mocks_1.createSessionRouteMock.userActive);
        yield userRepo.save(user);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createSessionRouteMock.userInvalidCredential1);
        const expectResults = {
            status: 401,
            bodyEqual: { message: 'Invalid credentials' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyEqual);
    }));
    it('Error: Must not be able to login - Invalid credential 2 - Wrong email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userRepo.create(mocks_1.createSessionRouteMock.userActive);
        yield userRepo.save(user);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createSessionRouteMock.userInvalidCredential2);
        const expectResults = {
            status: 401,
            bodyEqual: { message: 'Invalid credentials' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyEqual);
    }));
    it('Error: Must not be able to login - Invalid credential 3 - User inactive', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = userRepo.create(mocks_1.createSessionRouteMock.userToInactive);
        yield userRepo.save(user);
        yield userRepo.softRemove(user);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .send(mocks_1.createSessionRouteMock.userToInactive);
        const expectResults = {
            status: 401,
            bodyEqual: { message: 'Invalid credentials' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toStrictEqual(expectResults.bodyEqual);
    }));
});
