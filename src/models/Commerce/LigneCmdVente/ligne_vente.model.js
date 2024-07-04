const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Ligne_Vente = sequelize.define(
    'Lignes_Ventes',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        prix_vente: { type: DataTypes.FLOAT, allowNull: false },
        quantite: { type: DataTypes.INTEGER, allowNull: false },
        unite: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'Lignes_Ventes' },
);

module.exports = Ligne_Vente;