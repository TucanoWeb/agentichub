"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./db/sequelize");
const models_1 = require("./db/models");
const server_1 = require("./server");
const env_1 = require("./config/env");
async function main() {
    (0, models_1.initModels)();
    await (0, sequelize_1.assertDbConnection)();
    const shouldAlter = process.env.DB_SYNC_ALTER === 'YES' || env_1.env.nodeEnv !== 'production';
    await sequelize_1.sequelize.sync({ alter: shouldAlter });
    const server = await (0, server_1.createServer)();
    await server.start();
    // eslint-disable-next-line no-console
    console.log(`🚀 AgenticHub API running on ${server.info.uri}`);
}
main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
