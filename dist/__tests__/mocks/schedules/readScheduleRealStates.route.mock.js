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
const data_source_1 = require("../../../data-source");
const entities_1 = require("../../../entities");
const manySchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    const realEstateRepo = data_source_1.AppDataSource.getRepository(entities_1.RealEstate);
    const addressRepo = data_source_1.AppDataSource.getRepository(entities_1.Address);
    const userRepo = data_source_1.AppDataSource.getRepository(entities_1.User);
    const categoryRepo = data_source_1.AppDataSource.getRepository(entities_1.Category);
    const scheduleRepo = data_source_1.AppDataSource.getRepository(entities_1.Schedule);
    const userAdmin = userRepo.create({
        name: 'admin',
        email: 'admin@mail.com',
        password: '1234',
        admin: true,
    });
    const userNotAdmin = userRepo.create({
        name: 'user',
        email: 'user@mail.com',
        password: '1234',
    });
    yield userRepo.save([userAdmin, userNotAdmin]);
    const category = yield categoryRepo.save({ name: 'Apartamento' });
    const address = yield addressRepo.save({
        city: 'São Paulo',
        street: 'Rua das Rosas',
        state: 'SP',
        zipCode: '000000011',
    });
    const realEstate = yield realEstateRepo.save({
        value: 1000000.0,
        size: 440,
        address,
        category,
    });
    const schedule1 = yield scheduleRepo.save({
        realEstate,
        user: userAdmin,
        date: '2022-03-01',
        hour: '12:30:00',
    });
    const schedule2 = yield scheduleRepo.save({
        realEstate,
        user: userNotAdmin,
        date: '2022-03-01',
        hour: '13:30:00',
    });
    return Object.assign(Object.assign({}, realEstate), { schedules: [
            Object.assign({ id: schedule1.id, date: schedule1.date, hour: schedule1.hour }, { user: Object.assign({}, userAdmin) }),
            Object.assign({ id: schedule2.id, date: schedule2.date, hour: schedule2.hour }, { user: Object.assign({}, userNotAdmin) }),
        ], address,
        category });
});
exports.default = { manySchedules };
