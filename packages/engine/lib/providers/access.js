"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("../source"));
const entities_1 = require("../entities");
const client_1 = __importDefault(require("./client"));
const account_1 = __importDefault(require("./account"));
const repo = source_1.default.manager.getRepository(entities_1.AccessToken);
const get = async (where) => await repo.find({ where })[0] || null;
const find = async (where) => await repo.find({ where }) || [];
const save = async (data) => {
    try {
        const client = typeof data.client == 'string' ? await client_1.default.get({ id: data.client }) : data.client;
        const account = typeof data.account == 'string' ? await account_1.default.get({ id: data.account }) : data.account;
        const expiry = data.expires || new Date(new Date().getFullYear() + 100);
        const token = new entities_1.AccessToken();
        token.key = data.key;
        token.client = client;
        token.account = account;
        token.expires = expiry;
        return await repo.save(token);
    }
    catch (e) {
        return e;
    }
};
exports.default = {
    get,
    find,
    save,
};
//# sourceMappingURL=access.js.map