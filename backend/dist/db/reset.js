"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./sequelize");
const models_1 = require("./models");
const seed_1 = require("../modules/blueprints/seed");
async function resetDb() {
    // Safety latch: destructive operation.
    if (process.env.DB_RESET_CONFIRM !== 'YES') {
        throw new Error('Refusing to reset DB. Set DB_RESET_CONFIRM=YES to proceed.');
    }
    (0, models_1.initModels)();
    await sequelize_1.sequelize.authenticate();
    // Postgres-only: drop and recreate schema to guarantee a clean slate.
    await sequelize_1.sequelize.query('DROP SCHEMA IF EXISTS public CASCADE;');
    await sequelize_1.sequelize.query('CREATE SCHEMA public;');
    await sequelize_1.sequelize.sync();
    await (0, seed_1.seedDefaultBlueprints)();
}
resetDb()
    .then(async () => {
    // eslint-disable-next-line no-console
    console.log('Database reset completed.');
    await sequelize_1.sequelize.close();
    process.exit(0);
})
    .catch(async (err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    await sequelize_1.sequelize.close();
    process.exit(1);
});
