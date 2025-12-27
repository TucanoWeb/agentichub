import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare email: string;
  declare passwordHash: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  } as any,
  {
    sequelize,
    tableName: 'users',
    timestamps: true
  }
);
