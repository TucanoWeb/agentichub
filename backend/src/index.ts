import { assertDbConnection, sequelize } from './db/sequelize';
import { initModels } from './db/models';
import { createServer } from './server';
import { env } from './config/env';

async function main() {
  initModels();
  await assertDbConnection();
  const shouldAlter = process.env.DB_SYNC_ALTER === 'YES' || env.nodeEnv !== 'production';
  await sequelize.sync({ alter: shouldAlter });

  const server = await createServer();
  await server.start();
  // eslint-disable-next-line no-console
  console.log(`🚀 AgenticHub API running on ${server.info.uri}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
