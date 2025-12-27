"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function required(name) {
    const value = process.env[name];
    if (!value)
        throw new Error(`Missing env var: ${name}`);
    return value;
}
exports.env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000),
    jwtSecret: required('JWT_SECRET'),
    db: {
        name: required('DB_NAME'),
        user: required('DB_USER'),
        password: required('DB_PASSWORD'),
        host: required('DB_HOST'),
        port: Number(process.env.DB_PORT ?? 5432)
    },
    gmail: {
        user: required('GMAIL_USER'),
        clientId: required('GMAIL_CLIENT_ID'),
        clientSecret: required('GMAIL_CLIENT_SECRET'),
        refreshToken: required('GMAIL_REFRESH_TOKEN')
    }
};
