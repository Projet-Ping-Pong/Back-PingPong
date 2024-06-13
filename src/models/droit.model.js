const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Droit = sequelize.define(
    'Droits',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        niveau: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'Droits' },
);

module.exports = Droit;