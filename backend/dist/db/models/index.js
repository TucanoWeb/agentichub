"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
exports.initModels = initModels;
const User_1 = require("./User");
const PasswordResetToken_1 = require("./PasswordResetToken");
const GitHubRepo_1 = require("./GitHubRepo");
const Favorite_1 = require("./Favorite");
function initModels() {
    User_1.User.hasMany(PasswordResetToken_1.PasswordResetToken, { foreignKey: 'user_id', as: 'passwordResetTokens', onDelete: 'CASCADE' });
    PasswordResetToken_1.PasswordResetToken.belongsTo(User_1.User, { foreignKey: 'user_id', as: 'user' });
    User_1.User.hasMany(Favorite_1.Favorite, { foreignKey: 'user_id', as: 'favorites', onDelete: 'CASCADE' });
    Favorite_1.Favorite.belongsTo(User_1.User, { foreignKey: 'user_id', as: 'user' });
    GitHubRepo_1.GitHubRepo.hasMany(Favorite_1.Favorite, { foreignKey: 'repo_id', as: 'favorites', onDelete: 'CASCADE' });
    Favorite_1.Favorite.belongsTo(GitHubRepo_1.GitHubRepo, { foreignKey: 'repo_id', as: 'repo' });
}
exports.models = {
    User: User_1.User,
    PasswordResetToken: PasswordResetToken_1.PasswordResetToken,
    GitHubRepo: GitHubRepo_1.GitHubRepo,
    Favorite: Favorite_1.Favorite
};
