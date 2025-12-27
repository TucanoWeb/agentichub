"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintFile = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class BlueprintFile extends sequelize_1.Model {
}
exports.BlueprintFile = BlueprintFile;
BlueprintFile.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    blueprintId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    path: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'blueprint_files',
    timestamps: true,
    indexes: [{ unique: true, fields: ['blueprintId', 'path'] }]
});
