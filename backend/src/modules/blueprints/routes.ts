import type { Server } from '@hapi/hapi';
import Joi from 'joi';
import { createBlueprintPayload, fetchBlueprintQuery, updateBlueprintPayload } from './validators';
import {
  createBlueprint,
  deleteBlueprint,
  fetchBlueprintForAgent,
  getBlueprintByHash,
  listBlueprints,
  listMyBlueprints,
  updateBlueprint
} from './service';

export async function registerBlueprintRoutes(server: Server) {
  server.route({
    method: 'GET',
    path: '/blueprints',
    options: {
      auth: false
    },
    handler: async (_req, h) => {
      const items = await listBlueprints();
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
      const userId = (req.auth.credentials as any).userId as string;
      const items = await listMyBlueprints(userId);
      return h.response({ items: items.map((i) => i.get({ plain: true })) }).code(200);
    }
  });

  server.route({
    method: 'GET',
    path: '/blueprints/{hash}',
    options: {
      auth: false,
      validate: {
        params: Joi.object({ hash: Joi.string().required() })
      }
    },
    handler: async (req, h) => {
      const { hash } = req.params as { hash: string };
      const blueprint = await getBlueprintByHash(hash);
      if (!blueprint) return h.response({ error: 'Not found' }).code(404);
      return h.response({ blueprint: blueprint.get({ plain: true }) }).code(200);
    }
  });

  server.route({
    method: 'GET',
    path: '/fetch-blueprint',
    options: {
      auth: false,
      validate: { query: fetchBlueprintQuery }
    },
    handler: async (req, h) => {
      const { hash } = req.query as { hash: string };
      const blueprint = await fetchBlueprintForAgent(hash);
      if (!blueprint) return h.response({ error: 'Not found' }).code(404);
      return h.response({ blueprint: blueprint.get({ plain: true }) }).code(200);
    }
  });

  server.route({
    method: 'POST',
    path: '/blueprints',
    options: {
      auth: 'jwt',
      validate: { payload: createBlueprintPayload }
    },
    handler: async (req, h) => {
      const userId = (req.auth.credentials as any).userId as string;
      const payload = req.payload as any;
      try {
        const blueprint = await createBlueprint({ ...payload, userId });
        return h.response({ blueprint: blueprint.get({ plain: true }) }).code(201);
      } catch (err: any) {
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
        params: Joi.object({ hash: Joi.string().required() }),
        payload: updateBlueprintPayload
      }
    },
    handler: async (req, h) => {
      const { hash } = req.params as { hash: string };
      const userId = (req.auth.credentials as any).userId as string;
      const payload = req.payload as any;
      try {
        const blueprint = await updateBlueprint(hash, { ...payload, userId });
        if (!blueprint) return h.response({ error: 'Not found' }).code(404);
        return h.response({ blueprint: blueprint.get({ plain: true }) }).code(200);
      } catch (err: any) {
        if (err?.code === 'FORBIDDEN') return h.response({ error: 'Forbidden' }).code(403);
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
        params: Joi.object({ hash: Joi.string().required() })
      }
    },
    handler: async (req, h) => {
      const { hash } = req.params as { hash: string };
      const userId = (req.auth.credentials as any).userId as string;
      try {
        const ok = await deleteBlueprint(hash, userId);
        if (!ok) return h.response({ error: 'Not found' }).code(404);
        return h.response({ ok: true }).code(200);
      } catch (err: any) {
        if (err?.code === 'FORBIDDEN') return h.response({ error: 'Forbidden' }).code(403);
        return h.response({ error: 'Failed to delete blueprint' }).code(400);
      }
    }
  });
}
