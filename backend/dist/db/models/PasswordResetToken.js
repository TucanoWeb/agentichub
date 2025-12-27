"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetToken = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize");
class PasswordResetToken extends sequelize_1.Model {
}
exports.PasswordResetToken = PasswordResetToken;
PasswordResetToken.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    tokenHash: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    usedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: sequelize_2.sequelize,
    tableName: 'password_reset_tokens',
    timestamps: true
});
