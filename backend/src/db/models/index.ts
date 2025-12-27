import { User } from './User';
import { PasswordResetToken } from './PasswordResetToken';
import { GitHubRepo } from './GitHubRepo';
import { Favorite } from './Favorite';

export function initModels(): void {
  User.hasMany(PasswordResetToken, { foreignKey: 'user_id', as: 'passwordResetTokens', onDelete: 'CASCADE' });
  PasswordResetToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  User.hasMany(Favorite, { foreignKey: 'user_id', as: 'favorites', onDelete: 'CASCADE' });
  Favorite.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

  GitHubRepo.hasMany(Favorite, { foreignKey: 'repo_id', as: 'favorites', onDelete: 'CASCADE' });
  Favorite.belongsTo(GitHubRepo, { foreignKey: 'repo_id', as: 'repo' });
}

export const models = {
  User,
  PasswordResetToken,
  GitHubRepo,
  Favorite
};
