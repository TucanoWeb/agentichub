import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class GitHubRepo extends Model<InferAttributes<GitHubRepo>, InferCreationAttributes<GitHubRepo>> {
  declare id: string;
  declare github_url: string;
  declare tags: string;
  declare readonly created_at: Date;
}

GitHubRepo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    github_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: true
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  } as any,
  {
    sequelize,
    tableName: 'github_repos',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  }
);