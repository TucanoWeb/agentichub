import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { Blueprint } from './Blueprint';

export class BlueprintFile extends Model<InferAttributes<BlueprintFile>, InferCreationAttributes<BlueprintFile>> {
  declare id: string;
  declare blueprintId: ForeignKey<Blueprint['id']>;
  declare path: string;
  declare content: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

BlueprintFile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    blueprintId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    path: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  } as any,
  {
    sequelize,
    tableName: 'blueprint_files',
    timestamps: true,
    indexes: [{ unique: true, fields: ['blueprintId', 'path'] }]
  }
);
