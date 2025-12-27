"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBlueprints = listBlueprints;
exports.listMyBlueprints = listMyBlueprints;
exports.getBlueprintByHash = getBlueprintByHash;
exports.fetchBlueprintForAgent = fetchBlueprintForAgent;
exports.createBlueprint = createBlueprint;
exports.updateBlueprint = updateBlueprint;
exports.deleteBlueprint = deleteBlueprint;
const crypto_1 = __importDefault(require("crypto"));
const sequelize_1 = require("../../db/sequelize");
const Blueprint_1 = require("../../db/models/Blueprint");
const BlueprintFile_1 = require("../../db/models/BlueprintFile");
function computeHash(input) {
    const payload = JSON.stringify({
        name: input.name,
        instructions: input.instructions,
        files: [...input.files].sort((a, b) => a.path.localeCompare(b.path))
    });
    return crypto_1.default.createHash('sha256').update(payload).digest('hex');
}
async function listBlueprints() {
    const items = await Blueprint_1.Blueprint.findAll({
        order: [['updatedAt', 'DESC']],
        attributes: ['hash', 'name', 'description', 'usageCount', 'updatedAt']
    });
    return items;
}
async function listMyBlueprints(userId) {
    const items = await Blueprint_1.Blueprint.findAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
        attributes: ['hash', 'name', 'description', 'usageCount', 'updatedAt']
    });
    return items;
}
async function getBlueprintByHash(hash) {
    const blueprint = await Blueprint_1.Blueprint.findOne({
        where: { hash },
        include: [{ model: BlueprintFile_1.BlueprintFile, as: 'files', attributes: ['path', 'content'] }]
    });
    return blueprint;
}
async function fetchBlueprintForAgent(hash) {
    return sequelize_1.sequelize.transaction(async (t) => {
        const blueprint = await Blueprint_1.Blueprint.findOne({
            where: { hash },
            include: [{ model: BlueprintFile_1.BlueprintFile, as: 'files', attributes: ['path', 'content'] }],
            transaction: t,
            lock: t.LOCK.UPDATE
        });
        if (!blueprint)
            return null;
        blueprint.usageCount += 1;
        await blueprint.save({ transaction: t });
        return blueprint;
    });
}
async function createBlueprint(input) {
    const hash = computeHash({ name: input.name, instructions: input.instructions, files: input.files });
    return sequelize_1.sequelize.transaction(async (t) => {
        const existing = await Blueprint_1.Blueprint.findOne({ where: { hash }, transaction: t });
        if (existing) {
            // Hash is globally unique. If it exists and belongs to another user, reject.
            if (existing.userId && existing.userId !== input.userId) {
                const err = new Error('Blueprint already exists');
                err.code = 'BLUEPRINT_EXISTS';
                throw err;
            }
            return existing;
        }
        const blueprint = await Blueprint_1.Blueprint.create({
            userId: input.userId,
            hash,
            name: input.name,
            description: input.description ?? null,
            instructions: input.instructions
        }, { transaction: t });
        await BlueprintFile_1.BlueprintFile.bulkCreate(input.files.map((f) => ({ blueprintId: blueprint.id, path: f.path, content: f.content })), { transaction: t });
        return blueprint;
    });
}
async function updateBlueprint(hash, input) {
    return sequelize_1.sequelize.transaction(async (t) => {
        const blueprint = await Blueprint_1.Blueprint.findOne({ where: { hash }, transaction: t, lock: t.LOCK.UPDATE });
        if (!blueprint)
            return null;
        if (blueprint.userId !== input.userId) {
            const err = new Error('Forbidden');
            err.code = 'FORBIDDEN';
            throw err;
        }
        if (input.name !== undefined)
            blueprint.name = input.name;
        if (input.description !== undefined)
            blueprint.description = input.description;
        if (input.instructions !== undefined)
            blueprint.instructions = input.instructions;
        await blueprint.save({ transaction: t });
        if (input.files) {
            await BlueprintFile_1.BlueprintFile.destroy({ where: { blueprintId: blueprint.id }, transaction: t });
            await BlueprintFile_1.BlueprintFile.bulkCreate(input.files.map((f) => ({ blueprintId: blueprint.id, path: f.path, content: f.content })), { transaction: t });
        }
        return blueprint;
    });
}
async function deleteBlueprint(hash, userId) {
    return sequelize_1.sequelize.transaction(async (t) => {
        const blueprint = await Blueprint_1.Blueprint.findOne({ where: { hash }, transaction: t, lock: t.LOCK.UPDATE });
        if (!blueprint)
            return null;
        if (blueprint.userId !== userId) {
            const err = new Error('Forbidden');
            err.code = 'FORBIDDEN';
            throw err;
        }
        await BlueprintFile_1.BlueprintFile.destroy({ where: { blueprintId: blueprint.id }, transaction: t });
        await blueprint.destroy({ transaction: t });
        return true;
    });
}
