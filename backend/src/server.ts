import Hapi from '@hapi/hapi';
import HapiAuthJwt2 from 'hapi-auth-jwt2';
import { env } from './config/env';
import { User } from './db/models/User';
import { registerModules } from './modules';

export async function createServer() {
  const server = Hapi.server({
    port: env.port,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['localhost:5173', 'http://localhost:5173', env.frontendUrl || 'http://localhost:5173'],
        additionalHeaders: ['authorization', 'content-type']
      }
    }
  });

  await server.register(HapiAuthJwt2);

  server.auth.strategy('jwt', 'jwt', {
    key: env.jwtSecret,
    validate: async (decoded: any) => {
      const userId = decoded?.sub;
      if (!userId) return { isValid: false };
      const user = await User.findByPk(userId);
      if (!user) return { isValid: false };
      return { isValid: true, credentials: { userId: user.id } };
    },
    verifyOptions: { algorithms: ['HS256'] }
  });

  server.auth.default({ strategy: 'jwt', mode: 'optional' });

  await registerModules(server);

  server.route({
    method: 'GET',
    path: '/health',
    options: { auth: false },
    handler: () => ({ ok: true })
  });

  return server;
}
