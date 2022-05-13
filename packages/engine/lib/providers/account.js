"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("appendix");
const source_1 = __importDefault(require("../source"));
const argon2_1 = __importDefault(require("argon2"));
const entities_1 = require("../entities");
const errors_1 = require("../errors");
const repo = source_1.default.manager.getRepository(entities_1.Account);
const get = async (where) => await repo.find({ where })[0] || null;
const find = async (where) => await repo.find({ where }) || [];
const save = async ({ email, username, password }) => {
    try {
        const account = new entities_1.Account();
        account.email = email;
        account.username = username;
        account.password = await argon2_1.default.hash(password);
        const saved = await repo.save(account);
        console.log(saved);
        if (!saved) {
            throw new Error('Unable to save account');
        }
        return saved;
    }
    catch (e) {
        (0, errors_1.DatabaseError)(e);
        return e;
    }
};
const verify = async ({ login, password }) => {
    try {
        const accounts = await repo.find({
            where: [
                { email: login },
                { username: login },
            ]
        });
        const account = accounts.first();
        if (!account) {
            return null;
        }
        if (await argon2_1.default.verify(account.password, password)) {
            return account;
        }
        return null;
    }
    catch (e) {
        throw e;
    }
};
exports.default = {
    get,
    find,
    save,
    verify
};
//# sourceMappingURL=account.js.map