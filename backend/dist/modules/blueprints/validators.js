"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlueprintPayload = exports.createBlueprintPayload = exports.fetchBlueprintQuery = void 0;
const joi_1 = __importDefault(require("joi"));
exports.fetchBlueprintQuery = joi_1.default.object({
    hash: joi_1.default.string().min(8).max(128).required()
});
exports.createBlueprintPayload = joi_1.default.object({
    name: joi_1.default.string().min(3).max(200).required(),
    description: joi_1.default.string().allow('').max(5000).optional(),
    instructions: joi_1.default.string().min(1).required(),
    files: joi_1.default.array()
        .items(joi_1.default.object({
        path: joi_1.default.string().min(1).max(500).required(),
        content: joi_1.default.string().min(0).required()
    }))
        .min(1)
        .required()
});
exports.updateBlueprintPayload = joi_1.default.object({
    name: joi_1.default.string().min(3).max(200).optional(),
    description: joi_1.default.string().allow('').max(5000).optional(),
    instructions: joi_1.default.string().min(1).optional(),
    files: joi_1.default.array().items(joi_1.default.object({
        path: joi_1.default.string().min(1).max(500).required(),
        content: joi_1.default.string().min(0).required()
    }))
});
