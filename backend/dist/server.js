"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const hapi_auth_jwt2_1 = __importDefault(require("hapi-auth-jwt2"));
const env_1 = require("./config/env");
const User_1 = require("./db/models/User");
const modules_1 = require("./modules");
async function createServer() {
    const server = hapi_1.default.server({
        port: env_1.env.port,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['localhost:5173', 'http://localhost:5173', env_1.env.frontendUrl || 'http://localhost:5173'],
                additionalHeaders: ['authorization', 'content-type']
            }
        }
    });
    await server.register(hapi_auth_jwt2_1.default);
    server.auth.strategy('jwt', 'jwt', {
        key: env_1.env.jwtSecret,
        validate: async (decoded) => {
            const userId = decoded?.sub;
            if (!userId)
                return { isValid: false };
            const user = await User_1.User.findByPk(userId);
            if (!user)
                return { isValid: false };
            return { isValid: true, credentials: { userId: user.id } };
        },
        verifyOptions: { algorithms: ['HS256'] }
    });
    server.auth.default({ strategy: 'jwt', mode: 'optional' });
    await (0, modules_1.registerModules)(server);
    server.route({
        method: 'GET',
        path: '/health',
        options: { auth: false },
        handler: () => ({ ok: true })
    });
    return server;
}
