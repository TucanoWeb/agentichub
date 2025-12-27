"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blueprint = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class Blueprint extends sequelize_1.Model {
}
exports.Blueprint = Blueprint;
Blueprint.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    },
    hash: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    instructions: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    usageCount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'blueprints',
    timestamps: true
});
