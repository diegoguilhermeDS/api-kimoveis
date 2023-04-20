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
describe('POST /schedules', () => {
    let connection;
    const baseUrl = '/schedules';
    let realEstate1;
    let realEstate2;
    let userAdmin;
    let userNotAdmin;
    let userAdminToken;
    let userNotAdminToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => __awaiter(void 0, void 0, void 0, function* () {
            connection = res;
            [realEstate1, realEstate2] =
                yield mocks_1.readRealEstateRouteMock.manyRealStations(2);
            userAdmin = yield connection
                .getRepository(entities_1.User)
                .save(mocks_1.createUserRouteMock.userComplete);
            userNotAdmin = yield connection
                .getRepository(entities_1.User)
                .save(mocks_1.createUserRouteMock.userWithoutAdmin);
            userAdminToken = mocks_1.tokenMock.genToken(true, userAdmin.id);
            userNotAdminToken = mocks_1.tokenMock.genToken(false, userNotAdmin.id);
        }))
            .catch((error) => console.error(error));
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection
            .getRepository(entities_1.Schedule)
            .remove(yield connection.getRepository(entities_1.Schedule).find());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    it('Success: Must be able create a schedule - Admin token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(Object.assign(Object.assign({}, mocks_1.createScheduleRouteMock.schedulesComplete), { realEstateId: realEstate1.id }));
        const expectResults = {
            status: 201,
            expectBody: { message: 'Schedule created' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expectResults.expectBody);
    }));
    it('Success: Must be able create a schedule - User token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userNotAdminToken}`)
            .send(Object.assign(Object.assign({}, mocks_1.createScheduleRouteMock.schedulesComplete), { realEstateId: realEstate2.id }));
        const expectResults = {
            status: 201,
            expectBody: { message: 'Schedule created' },
        };
        expect(response.status).toBe(expectResults.status);
        expect(response.body).toEqual(expectResults.expectBody);
    }));
    it('Error: Must not be able to create a schedule - Admin token - Invalid RealEstate ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(mocks_1.createScheduleRouteMock.schedulesRealEstateInvalidID);
        expect(response.body).toEqual(mocks_1.errorsMock.notFound.realEstate.error);
        expect(response.status).toBe(mocks_1.errorsMock.notFound.realEstate.status);
    }));
    it('Error: Must not be able to create a schedule - Admin token - Real Estate schedule already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mocks_1.createScheduleRouteMock.schedulesUnique;
        yield data_source_1.AppDataSource.getRepository(entities_1.Schedule).save(Object.assign(Object.assign({}, payload), { user: userNotAdmin, realEstate: realEstate1 }));
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(Object.assign(Object.assign({}, payload), { realEstateId: realEstate1.id }));
        const expectResults = {
            status: 409,
            expectBody: {
                message: 'Schedule to this real estate at this date and time already exists',
            },
        };
        expect(response.body).toEqual(expectResults.expectBody);
        expect(response.status).toBe(expectResults.status);
    }));
    it('Error: Must not be able to create a schedule - Admin token - User schedule already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mocks_1.createScheduleRouteMock.schedulesSameDateDifferentRealEstate;
        yield data_source_1.AppDataSource.getRepository(entities_1.Schedule).save(Object.assign(Object.assign({}, payload), { user: userAdmin, realEstate: realEstate2 }));
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(Object.assign(Object.assign({}, payload), { realEstateId: realEstate1.id }));
        const expectResults = {
            status: 409,
            expectBody: {
                message: 'User schedule to this real estate at this date and time already exists',
            },
        };
        expect(response.body).toEqual(expectResults.expectBody);
        expect(response.status).toBe(expectResults.status);
    }));
    it('Error: Must not be able to create a schedule - Admin token - Schedule before 8AM', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mocks_1.createScheduleRouteMock.schedulesBefore8AM;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(Object.assign(Object.assign({}, payload), { realEstateId: realEstate1.id }));
        const expectResults = {
            status: 400,
            expectBody: { message: 'Invalid hour, available times are 8AM to 18PM' },
        };
        expect(response.body).toEqual(expectResults.expectBody);
        expect(response.status).toBe(expectResults.status);
    }));
    it('Error: Must not be able to create a schedule - Admin token - Schedule before 18PM', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mocks_1.createScheduleRouteMock.schedulesAfter18PM;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(Object.assign(Object.assign({}, payload), { realEstateId: realEstate1.id }));
        const expectResults = {
            status: 400,
            expectBody: { message: 'Invalid hour, available times are 8AM to 18PM' },
        };
        expect(response.body).toEqual(expectResults.expectBody);
        expect(response.status).toBe(expectResults.status);
    }));
    it('Error: Must not be able to create a schedule - Admin token - Schedule Saturday', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mocks_1.createScheduleRouteMock.schedulesInvalidDate;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(Object.assign(Object.assign({}, payload), { realEstateId: realEstate1.id }));
        const expectResults = {
            status: 400,
            expectBody: { message: 'Invalid date, work days are monday to friday' },
        };
        expect(response.body).toEqual(expectResults.expectBody);
        expect(response.status).toBe(expectResults.status);
    }));
    it('Error: Must not be able to create a schedule - Admin token - Invalid body', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mocks_1.createScheduleRouteMock.schedulesInvalidBody;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(payload);
        const expectResults = {
            status: 400,
            expectBody: {
                message: {
                    date: ['Expected string, received number'],
                    hour: ['Expected string, received array'],
                    realEstateId: ['Expected number, received string'],
                },
            },
        };
        expect(response.body).toEqual(expectResults.expectBody);
        expect(response.status).toBe(expectResults.status);
    }));
    it('Error: Must not be able to create a schedule - Admin token - Invalid body 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const payload = mocks_1.createScheduleRouteMock.schedulesInvalidBody2;
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${userAdminToken}`)
            .send(payload);
        const expectResults = {
            status: 400,
            expectBody: {
                message: {
                    date: ['Required'],
                    hour: ['Required'],
                    realEstateId: ['Required'],
                },
            },
        };
        expect(response.body).toEqual(expectResults.expectBody);
        expect(response.status).toBe(expectResults.status);
    }));
    it('Error: Must not be able to create a schedule - Missing bearer', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post(baseUrl).send({});
        expect(response.body).toEqual(mocks_1.errorsMock.missingBearer.error);
        expect(response.status).toBe(mocks_1.errorsMock.missingBearer.status);
    }));
    it('Error: Must not be able to create a schedule - Invalid signature', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.invalidSignature}`)
            .send({});
        expect(response.body).toEqual(mocks_1.errorsMock.invalidSignature.error);
        expect(response.status).toBe(mocks_1.errorsMock.invalidSignature.status);
    }));
    it('Error: Must not be able to create a schedule - JWT malformed', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post(baseUrl)
            .set('Authorization', `Bearer ${mocks_1.tokenMock.jwtMalformed}`)
            .send({});
        expect(response.body).toEqual(mocks_1.errorsMock.jwtMalformed.error);
        expect(response.status).toBe(mocks_1.errorsMock.jwtMalformed.status);
    }));
});
