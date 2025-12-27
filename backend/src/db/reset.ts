import { sequelize } from './sequelize';
import { initModels } from './models';
import { seedDefaultBlueprints } from '../modules/blueprints/seed';

async function resetDb() {
  // Safety latch: destructive operation.
  if (process.env.DB_RESET_CONFIRM !== 'YES') {
    throw new Error('Refusing to reset DB. Set DB_RESET_CONFIRM=YES to proceed.');
  }

  initModels();
  await sequelize.authenticate();

  // Postgres-only: drop and recreate schema to guarantee a clean slate.
  await sequelize.query('DROP SCHEMA IF EXISTS public CASCADE;');
  await sequelize.query('CREATE SCHEMA public;');

  await sequelize.sync();
  await seedDefaultBlueprints();
}

resetDb()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log('Database reset completed.');
    await sequelize.close();
    process.exit(0);
  })
  .catch(async (err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    await sequelize.close();
    process.exit(1);
  });
