import crypto from 'crypto';
import { Transaction } from 'sequelize';
import { sequelize } from '../../db/sequelize';
import { Blueprint } from '../../db/models/Blueprint';
import { BlueprintFile } from '../../db/models/BlueprintFile';

export type BlueprintFileInput = { path: string; content: string };

function computeHash(input: { name: string; instructions: string; files: BlueprintFileInput[] }): string {
  const payload = JSON.stringify({
    name: input.name,
    instructions: input.instructions,
    files: [...input.files].sort((a, b) => a.path.localeCompare(b.path))
  });

  return crypto.createHash('sha256').update(payload).digest('hex');
}

export async function listBlueprints() {
  const items = await Blueprint.findAll({
    order: [['updatedAt', 'DESC']],
    attributes: ['hash', 'name', 'description', 'usageCount', 'updatedAt']
  });
  return items;
}

export async function listMyBlueprints(userId: string) {
  const items = await Blueprint.findAll({
    where: { userId },
    order: [['updatedAt', 'DESC']],
    attributes: ['hash', 'name', 'description', 'usageCount', 'updatedAt']
  });
  return items;
}

export async function getBlueprintByHash(hash: string) {
  const blueprint = await Blueprint.findOne({
    where: { hash },
    include: [{ model: BlueprintFile, as: 'files', attributes: ['path', 'content'] }]
  });
  return blueprint;
}

export async function fetchBlueprintForAgent(hash: string) {
  return sequelize.transaction(async (t: Transaction) => {
    const blueprint = await Blueprint.findOne({
      where: { hash },
      include: [{ model: BlueprintFile, as: 'files', attributes: ['path', 'content'] }],
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (!blueprint) return null;

    blueprint.usageCount += 1;
    await blueprint.save({ transaction: t });

    return blueprint;
  });
}

export async function createBlueprint(input: {
  userId: string;
  name: string;
  description?: string;
  instructions: string;
  files: BlueprintFileInput[];
}) {
  const hash = computeHash({ name: input.name, instructions: input.instructions, files: input.files });

  return sequelize.transaction(async (t) => {
    const existing = await Blueprint.findOne({ where: { hash }, transaction: t });
    if (existing) {
      // Hash is globally unique. If it exists and belongs to another user, reject.
      if (existing.userId && existing.userId !== input.userId) {
        const err = new Error('Blueprint already exists');
        (err as any).code = 'BLUEPRINT_EXISTS';
        throw err;
      }
      return existing;
    }

    const blueprint = await Blueprint.create(
      {
        userId: input.userId,
        hash,
        name: input.name,
        description: input.description ?? null,
        instructions: input.instructions
      } as any,
      { transaction: t }
    );

    await BlueprintFile.bulkCreate(
      input.files.map((f) => ({ blueprintId: blueprint.id, path: f.path, content: f.content })) as any,
      { transaction: t }
    );

    return blueprint;
  });
}

export async function updateBlueprint(hash: string, input: {
  userId: string;
  name?: string;
  description?: string;
  instructions?: string;
  files?: BlueprintFileInput[];
}) {
  return sequelize.transaction(async (t) => {
    const blueprint = await Blueprint.findOne({ where: { hash }, transaction: t, lock: t.LOCK.UPDATE });
    if (!blueprint) return null;

    if (blueprint.userId !== input.userId) {
      const err = new Error('Forbidden');
      (err as any).code = 'FORBIDDEN';
      throw err;
    }

    if (input.name !== undefined) blueprint.name = input.name;
    if (input.description !== undefined) blueprint.description = input.description;
    if (input.instructions !== undefined) blueprint.instructions = input.instructions;
    await blueprint.save({ transaction: t });

    if (input.files) {
      await BlueprintFile.destroy({ where: { blueprintId: blueprint.id }, transaction: t });
      await BlueprintFile.bulkCreate(
        input.files.map((f) => ({ blueprintId: blueprint.id, path: f.path, content: f.content })) as any,
        { transaction: t }
      );
    }

    return blueprint;
  });
}

export async function deleteBlueprint(hash: string, userId: string) {
  return sequelize.transaction(async (t) => {
    const blueprint = await Blueprint.findOne({ where: { hash }, transaction: t, lock: t.LOCK.UPDATE });
    if (!blueprint) return null;

    if (blueprint.userId !== userId) {
      const err = new Error('Forbidden');
      (err as any).code = 'FORBIDDEN';
      throw err;
    }

    await BlueprintFile.destroy({ where: { blueprintId: blueprint.id }, transaction: t });
    await blueprint.destroy({ transaction: t });
    return true;
  });
}
