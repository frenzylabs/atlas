"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseError = (error) => {
    const { code, detail } = error.driverError;
    if (code === '23505') {
        let [field, value] = Array.from(detail.matchAll(/\(([^)]+)\)/g)).map(i => i[1]);
        throw new Error(`${field} ${value} already exists`);
    }
    throw Error(`[${code}] Database error: ${detail}`);
};
exports.default = parseError;
//# sourceMappingURL=db.js.map