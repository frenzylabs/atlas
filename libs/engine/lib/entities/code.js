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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const base_1 = __importDefault(require("./base"));
const client_1 = __importDefault(require("./client"));
const account_1 = __importDefault(require("./account"));
let Model = class Model extends base_1.default {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Model.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Model.prototype, "redirectUri", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => client_1.default, client => client.codes),
    __metadata("design:type", client_1.default)
], Model.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => account_1.default, account => account.codes),
    __metadata("design:type", account_1.default)
], Model.prototype, "account", void 0);
Model = __decorate([
    (0, typeorm_1.Entity)({ name: 'auth_code' })
], Model);
exports.default = Model;
//# sourceMappingURL=code.js.map