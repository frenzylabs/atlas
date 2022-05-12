"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const env_1 = __importDefault(require("env"));
const entities_1 = require("./entities");
const dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: env_1.default.db.host,
    port: env_1.default.db.port,
    username: env_1.default.db.user,
    password: env_1.default.db.password,
    database: env_1.default.db.name,
    synchronize: true,
    logging: true,
    entities: entities_1.entities,
    subscribers: [],
    migrations: [],
});
exports.default = dataSource;
//# sourceMappingURL=source.js.map