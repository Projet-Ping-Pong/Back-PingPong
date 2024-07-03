const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Machine = sequelize.define(
    'Machines',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
    },
    { tableName: 'Machines' },
);

module.exports = Machine;