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
exports.RefreshToken = exports.AccessToken = void 0;
const typeorm_1 = require("typeorm");
const base_1 = __importDefault(require("./base"));
const client_1 = __importDefault(require("./client"));
const account_1 = __importDefault(require("./account"));
class Token extends base_1.default {
}
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Token.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Token.prototype, "expires", void 0);
let AccessToken = class AccessToken extends Token {
};
__decorate([
    (0, typeorm_1.ManyToOne)(type => client_1.default, client => client.accessTokens),
    __metadata("design:type", client_1.default)
], AccessToken.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => account_1.default, account => account.accessTokens),
    __metadata("design:type", account_1.default)
], AccessToken.prototype, "account", void 0);
AccessToken = __decorate([
    (0, typeorm_1.Entity)({ name: 'auth_access_token' })
], AccessToken);
exports.AccessToken = AccessToken;
let RefreshToken = class RefreshToken extends Token {
};
__decorate([
    (0, typeorm_1.ManyToOne)(type => client_1.default, client => client.refreshTokens),
    __metadata("design:type", client_1.default)
], RefreshToken.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => account_1.default, account => account.accessTokens),
    __metadata("design:type", account_1.default)
], RefreshToken.prototype, "account", void 0);
RefreshToken = __decorate([
    (0, typeorm_1.Entity)({ name: 'auth_refresh_token' })
], RefreshToken);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=token.js.map