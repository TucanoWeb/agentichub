"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerModules = registerModules;
const routes_1 = require("./auth/routes");
const routes_2 = require("./repos/routes");
async function registerModules(server) {
    await (0, routes_1.registerAuthRoutes)(server);
    await (0, routes_2.registerRepoRoutes)(server);
}
