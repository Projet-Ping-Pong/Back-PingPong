const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Operation = sequelize.define(
    'Operations',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        temps: { type: DataTypes.STRING, allowNull: false },
        id_poste: { foreignKey: true, type: DataTypes.INTEGER, allowNull: true },
        id_machine: { foreignKey: true, type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: 'Operations' },
);

module.exports = Operation;