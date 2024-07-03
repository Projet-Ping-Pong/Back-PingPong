const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const GammeOperation = sequelize.define(
    'Gammes_Operations',
    {
        id_gamme: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
        id_operation: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'Gammes_Operations' },
);

module.exports = GammeOperation;