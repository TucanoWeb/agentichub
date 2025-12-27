"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchRepoQuery = exports.createRepoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createRepoSchema = joi_1.default.object({
    github_url: joi_1.default.string().uri().pattern(/github\.com/).required(),
    tags: joi_1.default.string().required()
});
exports.fetchRepoQuery = joi_1.default.object({
    id: joi_1.default.string().uuid().required()
});
