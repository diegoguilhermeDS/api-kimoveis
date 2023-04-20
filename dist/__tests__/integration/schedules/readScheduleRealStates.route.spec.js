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
const mocks_1 = require("../../mocks");
describe('GET /schedules/realEstate/:id', () => {
    let connection;
    const baseUrl = '/schedules/realEstate';
    let realEstateID;
    let realEstateInvalidID = baseUrl + '/123456';
    let readRealEstate;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            connection = res;
            readRealEstate = yield mocks_1.readScheduleRouteMock.manySchedules();
            realEstateID = baseUrl + `/${readRealEstate.id}`;
        }))
            .catch((error) => console.error(error));
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Must be able list all real estates schedules - Admin token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(realEstateID)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(true, 1)}`);
        const expectResults = {
            status: 200,
            expectBody: readRealEstate,
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expectResults.expectBody);
    }));
    it('Error: Must not be able list all real estates schedules - User token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(realEstateInvalidID)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(true, 1)}`);
        expect(response.body).toEqual(mocks_1.errorsMock.notFound.realEstate.error);
        expect(response.status).toBe(mocks_1.errorsMock.notFound.realEstate.status);
    }));
    it('Error: Must not be able list all real estates schedules - User token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(realEstateID)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.genToken(false, 1)}`);
        expect(response.body).toEqual(mocks_1.errorsMock.forbidden.error);
        expect(response.status).toBe(mocks_1.errorsMock.forbidden.status);
    }));
    it('Error: Must not be able list all real estates schedules - Missing bearer', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).get(realEstateID);
        expect(response.body).toEqual(mocks_1.errorsMock.missingBearer.error);
        expect(response.status).toBe(mocks_1.errorsMock.missingBearer.status);
    }));
    it('Error: Must not be able list all real estates schedules - Invalid signature', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(realEstateID)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.invalidSignature}`);
        expect(response.body).toEqual(mocks_1.errorsMock.invalidSignature.error);
        expect(response.status).toBe(mocks_1.errorsMock.invalidSignature.status);
    }));
    it('Error: Must not be able list all real estates schedules - JWT malformed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(realEstateID)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.jwtMalformed}`);
        expect(response.body).toEqual(mocks_1.errorsMock.jwtMalformed.error);
        expect(response.status).toBe(mocks_1.errorsMock.jwtMalformed.status);
    }));
});
