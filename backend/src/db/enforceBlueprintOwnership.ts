import type { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { User } from './models/User';

function randomPassword(): string {
  return crypto.randomBytes(24).toString('base64url');
}

function pickSeedEmail(): string {
  return (
    process.env.SEED_DEFAULT_EMAIL ||
    process.env.SEED_SUPPORT_EMAIL ||
    process.env.GMAIL_USER ||
    'seed@agentichub.local'
  );
}

function pickSeedPassword(): string {
  return process.env.SEED_DEFAULT_PASSWORD || process.env.SEED_SUPPORT_PASSWORD || randomPassword();
}

export async function enforceBlueprintOwnership(sequelize: Sequelize): Promise<void> {
  // 1) Ensure column exists (handles older DBs that predate ownership).
  await sequelize.query('ALTER TABLE "blueprints" ADD COLUMN IF NOT EXISTS "userId" UUID;');

  // 2) Ensure there is at least one user to own legacy/unowned blueprints.
  const email = pickSeedEmail();
  const passwordHash = await bcrypt.hash(pickSeedPassword(), 12);

  const [seedUser] = await User.findOrCreate({
    where: { email },
    defaults: { email, passwordHash } as any
  });

  // 3) Backfill any NULL userId rows to the seed user.
  await sequelize.query('UPDATE "blueprints" SET "userId" = :userId WHERE "userId" IS NULL;', {
    replacements: { userId: seedUser.id }
  });

  // 4) Enforce NOT NULL at DB level.
  await sequelize.query('ALTER TABLE "blueprints" ALTER COLUMN "userId" SET NOT NULL;');

  // 5) Enforce FK constraint (idempotent).
  await sequelize.query(`DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'blueprints_userId_fkey'
  ) THEN
    ALTER TABLE "blueprints"
      ADD CONSTRAINT "blueprints_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;
  END IF;
END$$;`);
}
