"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const secretKey = '1234';
process.env.SECRET_KEY = secretKey;
exports.default = {
    genToken: (admin, id) => {
        return (0, jsonwebtoken_1.sign)({ admin }, secretKey, { subject: id.toString() });
    },
    invalidSignature: (0, jsonwebtoken_1.sign)({ admin: true }, 'invalid_signature'),
    jwtMalformed: '12345',
};
