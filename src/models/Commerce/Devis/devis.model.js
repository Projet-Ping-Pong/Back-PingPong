const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Devis = sequelize.define(
    'Devis',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        delai: { type: DataTypes.DATE, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false },
    },
    { tableName: 'Devis' },
);

module.exports = Devis;