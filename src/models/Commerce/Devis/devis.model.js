const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Devis = sequelize.define(
    'Devis',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        delai: { type: DataTypes.DATEONLY, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: true },
    },
    { tableName: 'Devis' },
);

module.exports = Devis;