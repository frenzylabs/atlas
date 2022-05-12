"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const source_1 = __importDefault(require("../source"));
const argon2_1 = __importDefault(require("argon2"));
const entities_1 = require("../entities");
const repo = source_1.default.manager.getRepository(entities_1.Account);
const get = async (where) => await repo.find({ where })[0] || null;
const find = async (where) => await repo.find({ where }) || [];
const save = async ({ email, username, password }) => {
    try {
        const account = new entities_1.Account();
        account.email = email;
        account.username = username;
        account.password = await argon2_1.default.hash(password);
        return await repo.save(account);
    }
    catch (e) {
        return e;
    }
};
const verify = async ({ login, password }) => {
    try {
        const account = await find({
            where: [
                { email: login },
                { username: login },
            ]
        })[0];
        if (!account) {
            return false;
        }
        return await argon2_1.default.verify(account.password, password);
    }
    catch (e) {
        console.log('account verifty error: ', e);
        return false;
    }
};
exports.default = {
    get,
    find,
    save,
    verify
};
//# sourceMappingURL=account.js.map