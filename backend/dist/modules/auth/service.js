"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.requestPasswordReset = requestPasswordReset;
exports.resetPassword = resetPassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const PasswordResetToken_1 = require("../../db/models/PasswordResetToken");
const User_1 = require("../../db/models/User");
const service_1 = require("../email/service");
async function registerUser(input) {
    const existing = await User_1.User.findOne({ where: { email: input.email } });
    if (existing)
        throw new Error('Email already in use');
    const passwordHash = await bcrypt_1.default.hash(input.password, 12);
    const user = await User_1.User.create({ email: input.email, passwordHash });
    return { id: user.id, email: user.email };
}
async function loginUser(input) {
    const user = await User_1.User.findOne({ where: { email: input.email } });
    if (!user)
        throw new Error('Invalid credentials');
    const ok = await bcrypt_1.default.compare(input.password, user.passwordHash);
    if (!ok)
        throw new Error('Invalid credentials');
    const token = jsonwebtoken_1.default.sign({ sub: user.id }, env_1.env.jwtSecret, { expiresIn: '7d' });
    return { token };
}
function sha256Hex(value) {
    return crypto_1.default.createHash('sha256').update(value).digest('hex');
}
async function requestPasswordReset(input) {
    const user = await User_1.User.findOne({ where: { email: input.email } });
    // Always return ok to avoid leaking whether a user exists.
    if (!user)
        return { ok: true };
    const token = crypto_1.default.randomBytes(32).toString('base64url');
    const tokenHash = sha256Hex(token);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await PasswordResetToken_1.PasswordResetToken.create({ user_id: user.id, tokenHash, expiresAt, usedAt: null });
    // Minimal email content; frontend can provide UI to paste token.
    const subject = 'AgenticHub - Reset de senha';
    const text = `Use este token para resetar sua senha:\n\n${token}\n\nEle expira em 1 hora.`;
    await (0, service_1.sendEmail)({ to: user.email, subject, text });
    return { ok: true };
}
async function resetPassword(input) {
    const tokenHash = sha256Hex(input.token);
    const record = await PasswordResetToken_1.PasswordResetToken.findOne({ where: { tokenHash } });
    if (!record)
        throw new Error('Invalid token');
    if (record.usedAt)
        throw new Error('Token already used');
    if (record.expiresAt.getTime() < Date.now())
        throw new Error('Token expired');
    const user = await User_1.User.findByPk(record.userId);
    if (!user)
        throw new Error('Invalid token');
    const passwordHash = await bcrypt_1.default.hash(input.newPassword, 12);
    user.passwordHash = passwordHash;
    await user.save();
    record.usedAt = new Date();
    await record.save();
    return { ok: true };
}
