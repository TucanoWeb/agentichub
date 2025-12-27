"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerBlueprintRoutes = registerBlueprintRoutes;
const joi_1 = __importDefault(require("joi"));
const validators_1 = require("./validators");
const service_1 = require("./service");
async function registerBlueprintRoutes(server) {
    server.route({
        method: 'GET',
        path: '/blueprints',
        options: {
            auth: false
        },
        handler: async (_req, h) => {
            const items = await (0, service_1.listBlueprints)();
            return h.response({ items: items.map((i) => i.get({ plain: true })) }).code(200);
        }
    });
    server.route({
        method: 'GET',
        path: '/me/blueprints',
        options: {
            auth: 'jwt'
        },
        handler: async (req, h) => {
            const userId = req.auth.credentials.userId;
            const items = await (0, service_1.listMyBlueprints)(userId);
            return h.response({ items: items.map((i) => i.get({ plain: true })) }).code(200);
        }
    });
    server.route({
        method: 'GET',
        path: '/blueprints/{hash}',
        options: {
            auth: false,
            validate: {
                params: joi_1.default.object({ hash: joi_1.default.string().required() })
            }
        },
        handler: async (req, h) => {
            const { hash } = req.params;
            const blueprint = await (0, service_1.getBlueprintByHash)(hash);
            if (!blueprint)
                return h.response({ error: 'Not found' }).code(404);
            return h.response({ blueprint: blueprint.get({ plain: true }) }).code(200);
        }
    });
    server.route({
        method: 'GET',
        path: '/fetch-blueprint',
        options: {
            auth: false,
            validate: { query: validators_1.fetchBlueprintQuery }
        },
        handler: async (req, h) => {
            const { hash } = req.query;
            const blueprint = await (0, service_1.fetchBlueprintForAgent)(hash);
            if (!blueprint)
                return h.response({ error: 'Not found' }).code(404);
            return h.response({ blueprint: blueprint.get({ plain: true }) }).code(200);
        }
    });
    server.route({
        method: 'POST',
        path: '/blueprints',
        options: {
            auth: 'jwt',
            validate: { payload: validators_1.createBlueprintPayload }
        },
        handler: async (req, h) => {
            const userId = req.auth.credentials.userId;
            const payload = req.payload;
            try {
                const blueprint = await (0, service_1.createBlueprint)({ ...payload, userId });
                return h.response({ blueprint: blueprint.get({ plain: true }) }).code(201);
            }
            catch (err) {
                if (err?.code === 'BLUEPRINT_EXISTS') {
                    return h.response({ error: 'Blueprint already exists' }).code(409);
                }
                return h.response({ error: 'Failed to create blueprint' }).code(400);
            }
        }
    });
    server.route({
        method: 'PUT',
        path: '/blueprints/{hash}',
        options: {
            auth: 'jwt',
            validate: {
                params: joi_1.default.object({ hash: joi_1.default.string().required() }),
                payload: validators_1.updateBlueprintPayload
            }
        },
        handler: async (req, h) => {
            const { hash } = req.params;
            const userId = req.auth.credentials.userId;
            const payload = req.payload;
            try {
                const blueprint = await (0, service_1.updateBlueprint)(hash, { ...payload, userId });
                if (!blueprint)
                    return h.response({ error: 'Not found' }).code(404);
                return h.response({ blueprint: blueprint.get({ plain: true }) }).code(200);
            }
            catch (err) {
                if (err?.code === 'FORBIDDEN')
                    return h.response({ error: 'Forbidden' }).code(403);
                return h.response({ error: 'Failed to update blueprint' }).code(400);
            }
        }
    });
    server.route({
        method: 'DELETE',
        path: '/blueprints/{hash}',
        options: {
            auth: 'jwt',
            validate: {
                params: joi_1.default.object({ hash: joi_1.default.string().required() })
            }
        },
        handler: async (req, h) => {
            const { hash } = req.params;
            const userId = req.auth.credentials.userId;
            try {
                const ok = await (0, service_1.deleteBlueprint)(hash, userId);
                if (!ok)
                    return h.response({ error: 'Not found' }).code(404);
                return h.response({ ok: true }).code(200);
            }
            catch (err) {
                if (err?.code === 'FORBIDDEN')
                    return h.response({ error: 'Forbidden' }).code(403);
                return h.response({ error: 'Failed to delete blueprint' }).code(400);
            }
        }
    });
}
