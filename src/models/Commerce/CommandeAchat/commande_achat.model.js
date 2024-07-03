const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Commande_Achat = sequelize.define(
    'Commandes_Achats',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        date_liv_prevue: { type: DataTypes.DATE, allowNull: true },
        date_liv_reelle: { type: DataTypes.DATE, allowNull: true },
        date: { type: DataTypes.DATE, allowNull: true },
    },
    { tableName: 'Commandes_Achats' },
);

module.exports = Commande_Achat;