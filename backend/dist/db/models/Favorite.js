"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorite = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Favorite extends sequelize_1.Model {
}
exports.Favorite = Favorite;
Favorite.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    repo_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'favorites',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'repo_id']
        }
    ]
});
