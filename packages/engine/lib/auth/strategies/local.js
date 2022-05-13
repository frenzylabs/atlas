"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const providers_1 = require("../../providers");
const strategy = new passport_local_1.Strategy({
    usernameField: 'login',
    passwordField: 'password'
}, async (login, password, done) => {
    try {
        const account = await providers_1.AccountProvider.verify({ login, password });
        if (!account) {
            done(null, false);
        }
        else {
            done(null, account);
        }
    }
    catch (err) {
        done(err);
    }
});
passport_1.default.deserializeUser((id, done) => {
    console.log(id);
    done(null, id);
});
passport_1.default.serializeUser((id, done) => {
    try {
        const account = providers_1.AccountProvider.get({ id });
        if (!account)
            done(null, false);
        done(null, account);
    }
    catch (err) {
        done(err);
    }
});
exports.default = strategy;
//# sourceMappingURL=local.js.map