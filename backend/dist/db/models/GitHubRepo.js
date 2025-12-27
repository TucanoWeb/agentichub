"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubRepo = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class GitHubRepo extends sequelize_1.Model {
}
exports.GitHubRepo = GitHubRepo;
GitHubRepo.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    github_url: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    tags: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'github_repos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});
