const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Operation = sequelize.define(
    'Operations',
    {
        id_operation: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        temps: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'Operations' },
);

module.exports = Operation;