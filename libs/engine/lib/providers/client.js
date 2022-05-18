"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("../source"));
const entities_1 = require("../entities");
const repo = source_1.default.manager.getRepository(entities_1.AuthClient);
const get = async (where) => await repo.find({ where })[0] || null;
const find = async (where) => await repo.find({ where }) || [];
const save = async ({ name, secret, trusted }) => {
    try {
        const client = new entities_1.AuthClient();
        client.name = name;
        client.secret = secret;
        client.trusted = trusted;
        client.codes = [];
        client.accessTokens = [];
        client.refreshTokens = [];
        return await repo.save(client);
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
//# sourceMappingURL=client.js.map