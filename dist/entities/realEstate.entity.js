"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealEstate = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
const category_entity_1 = require("./category.entity");
const shedule_entity_1 = require("./shedule.entity");
let RealEstate = class RealEstate {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RealEstate.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false, nullable: true }),
    __metadata("design:type", Boolean)
], RealEstate.prototype, "sold", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Object)
], RealEstate.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], RealEstate.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "date" }),
    __metadata("design:type", String)
], RealEstate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "date" }),
    __metadata("design:type", String)
], RealEstate.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.Address),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.Address)
], RealEstate.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (categories) => categories.realEstate),
    __metadata("design:type", category_entity_1.Category)
], RealEstate.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => shedule_entity_1.Schedule, (shedules_users_properties) => shedules_users_properties.realEstate),
    __metadata("design:type", Array)
], RealEstate.prototype, "schedules", void 0);
RealEstate = __decorate([
    (0, typeorm_1.Entity)("real_estates")
], RealEstate);
exports.RealEstate = RealEstate;
