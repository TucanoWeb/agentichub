import type { Server } from '@hapi/hapi';
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from './validators';
import { loginUser, registerUser, requestPasswordReset, resetPassword } from './service';

export async function registerAuthRoutes(server: Server) {
  server.route({
    method: 'POST',
    path: '/auth/register',
    options: {
      auth: false,
      validate: { payload: registerSchema }
    },
    handler: async (req, h) => {
      const payload = req.payload as { email: string; password: string };
      try {
        const result = await registerUser(payload);
        return h.response(result).code(201);
      } catch (err: any) {
        return h.response({ error: err.message ?? 'Registration failed' }).code(400);
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/auth/login',
    options: {
      auth: false,
      validate: { payload: loginSchema }
    },
    handler: async (req, h) => {
      const payload = req.payload as { email: string; password: string };
      try {
        const result = await loginUser(payload);
        return h.response(result).code(200);
      } catch (err: any) {
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
      const userId = (req.auth.credentials as any).userId as string;
      return h.response({ userId }).code(200);
    }
  });

  server.route({
    method: 'POST',
    path: '/auth/forgot-password',
    options: {
      auth: false,
      validate: { payload: forgotPasswordSchema }
    },
    handler: async (req, h) => {
      const payload = req.payload as { email: string };
      await requestPasswordReset(payload);
      return h.response({ ok: true }).code(200);
    }
  });

  server.route({
    method: 'POST',
    path: '/auth/reset-password',
    options: {
      auth: false,
      validate: { payload: resetPasswordSchema }
    },
    handler: async (req, h) => {
      const payload = req.payload as { token: string; newPassword: string };
      try {
        await resetPassword(payload);
        return h.response({ ok: true }).code(200);
      } catch (err: any) {
        return h.response({ error: err.message ?? 'Reset failed' }).code(400);
      }
    }
  });
}
