"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(200).required()
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
exports.forgotPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().required()
});
exports.resetPasswordSchema = joi_1.default.object({
    token: joi_1.default.string().min(20).max(500).required(),
    newPassword: joi_1.default.string().min(8).max(200).required()
});
