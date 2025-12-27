import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class Blueprint extends Model<InferAttributes<Blueprint>, InferCreationAttributes<Blueprint>> {
  declare id: string;
  declare userId: string | null;
  declare hash: string;
  declare name: string;
  declare description: string | null;
  declare instructions: string;
  declare usageCount: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Blueprint.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true
    },
    hash: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    usageCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  } as any,
  {
    sequelize,
    tableName: 'blueprints',
    timestamps: true
  }
);
