import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import { PasswordResetToken } from '../../db/models/PasswordResetToken';
import { User } from '../../db/models/User';
import { sendEmail } from '../email/service';

export async function registerUser(input: { email: string; password: string }) {
  const existing = await User.findOne({ where: { email: input.email } });
  if (existing) throw new Error('Email already in use');

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await User.create({ email: input.email, passwordHash } as any);
  return { id: user.id, email: user.email };
}

export async function loginUser(input: { email: string; password: string }) {
  const user = await User.findOne({ where: { email: input.email } });
  if (!user) throw new Error('Invalid credentials');

  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) throw new Error('Invalid credentials');

  const token = jwt.sign({ sub: user.id }, env.jwtSecret, { expiresIn: '7d' });
  return { token };
}

function sha256Hex(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex');
}

export async function requestPasswordReset(input: { email: string }) {
  const user = await User.findOne({ where: { email: input.email } });

  // Always return ok to avoid leaking whether a user exists.
  if (!user) return { ok: true };

  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = sha256Hex(token);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await PasswordResetToken.create({ user_id: user.id, tokenHash, expiresAt, usedAt: null } as any);

  // Minimal email content; frontend can provide UI to paste token.
  const subject = 'AgenticHub - Reset de senha';
  const text = `Use este token para resetar sua senha:\n\n${token}\n\nEle expira em 1 hora.`;

  await sendEmail({ to: user.email, subject, text });
  return { ok: true };
}

export async function resetPassword(input: { token: string; newPassword: string }) {
  const tokenHash = sha256Hex(input.token);
  const record = await PasswordResetToken.findOne({ where: { tokenHash } });
  if (!record) throw new Error('Invalid token');
  if (record.usedAt) throw new Error('Token already used');
  if (record.expiresAt.getTime() < Date.now()) throw new Error('Token expired');

  const user = await User.findByPk(record.userId);
  if (!user) throw new Error('Invalid token');

  const passwordHash = await bcrypt.hash(input.newPassword, 12);
  user.passwordHash = passwordHash;
  await user.save();

  record.usedAt = new Date();
  await record.save();

  return { ok: true };
}
