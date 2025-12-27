"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceBlueprintOwnership = enforceBlueprintOwnership;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const User_1 = require("./models/User");
function randomPassword() {
    return crypto_1.default.randomBytes(24).toString('base64url');
}
function pickSeedEmail() {
    return (process.env.SEED_DEFAULT_EMAIL ||
        process.env.SEED_SUPPORT_EMAIL ||
        process.env.GMAIL_USER ||
        'seed@agentichub.local');
}
function pickSeedPassword() {
    return process.env.SEED_DEFAULT_PASSWORD || process.env.SEED_SUPPORT_PASSWORD || randomPassword();
}
async function enforceBlueprintOwnership(sequelize) {
    // 1) Ensure column exists (handles older DBs that predate ownership).
    await sequelize.query('ALTER TABLE "blueprints" ADD COLUMN IF NOT EXISTS "userId" UUID;');
    // 2) Ensure there is at least one user to own legacy/unowned blueprints.
    const email = pickSeedEmail();
    const passwordHash = await bcrypt_1.default.hash(pickSeedPassword(), 12);
    const [seedUser] = await User_1.User.findOrCreate({
        where: { email },
        defaults: { email, passwordHash }
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
