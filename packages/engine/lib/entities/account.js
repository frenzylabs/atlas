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
const code_1 = __importDefault(require("./code"));
const token_1 = require("./token");
let Model = class Model extends base_1.default {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Model.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Model.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Model.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => code_1.default, code => code.account),
    __metadata("design:type", Array)
], Model.prototype, "codes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => token_1.AccessToken, code => code.account),
    __metadata("design:type", Array)
], Model.prototype, "accessTokens", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => token_1.RefreshToken, code => code.account),
    __metadata("design:type", Array)
], Model.prototype, "refreshTokens", void 0);
Model = __decorate([
    (0, typeorm_1.Entity)({ name: 'accounts' })
], Model);
exports.default = Model;
//# sourceMappingURL=account.js.map