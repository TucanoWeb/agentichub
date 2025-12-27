"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(320),
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'users',
    timestamps: true
});
