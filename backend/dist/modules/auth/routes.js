"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthRoutes = registerAuthRoutes;
const validators_1 = require("./validators");
const service_1 = require("./service");
async function registerAuthRoutes(server) {
    server.route({
        method: 'POST',
        path: '/auth/register',
        options: {
            auth: false,
            validate: { payload: validators_1.registerSchema }
        },
        handler: async (req, h) => {
            const payload = req.payload;
            try {
                const result = await (0, service_1.registerUser)(payload);
                return h.response(result).code(201);
            }
            catch (err) {
                return h.response({ error: err.message ?? 'Registration failed' }).code(400);
            }
        }
    });
    server.route({
        method: 'POST',
        path: '/auth/login',
        options: {
            auth: false,
            validate: { payload: validators_1.loginSchema }
        },
        handler: async (req, h) => {
            const payload = req.payload;
            try {
                const result = await (0, service_1.loginUser)(payload);
                return h.response(result).code(200);
            }
            catch (err) {
                return h.response({ error: err.message ?? 'Login failed' }).code(401);
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/auth/me',
        options: {
            auth: 'jwt'
        },
        handler: async (req, h) => {
            const userId = req.auth.credentials.userId;
            return h.response({ userId }).code(200);
        }
    });
    server.route({
        method: 'POST',
        path: '/auth/forgot-password',
        options: {
            auth: false,
            validate: { payload: validators_1.forgotPasswordSchema }
        },
        handler: async (req, h) => {
            const payload = req.payload;
            await (0, service_1.requestPasswordReset)(payload);
            return h.response({ ok: true }).code(200);
        }
    });
    server.route({
        method: 'POST',
        path: '/auth/reset-password',
        options: {
            auth: false,
            validate: { payload: validators_1.resetPasswordSchema }
        },
        handler: async (req, h) => {
            const payload = req.payload;
            try {
                await (0, service_1.resetPassword)(payload);
                return h.response({ ok: true }).code(200);
            }
            catch (err) {
                return h.response({ error: err.message ?? 'Reset failed' }).code(400);
            }
        }
    });
}
