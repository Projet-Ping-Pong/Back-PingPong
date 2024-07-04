const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Commande_Vente = sequelize.define(
    'Commandes_Ventes',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.DATEONLY, allowNull: false },
    },
    { tableName: 'Commandes_Ventes' },
);

module.exports = Commande_Vente;