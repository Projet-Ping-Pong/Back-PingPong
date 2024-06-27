const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Fournisseur = sequelize.define(
    'Fournisseurs',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        raison_sociale: { type: DataTypes.STRING, allowNull: false },
        adresse: { type: DataTypes.STRING, allowNull: true },
    },
    { tableName: 'Fournisseurs' },
);

module.exports = Fournisseur;