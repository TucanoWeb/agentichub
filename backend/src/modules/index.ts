import type { Server } from '@hapi/hapi';
import { registerAuthRoutes } from './auth/routes';
import { registerRepoRoutes } from './repos/routes';

export async function registerModules(server: Server): Promise<void> {
  await registerAuthRoutes(server);
  await registerRepoRoutes(server);
}
