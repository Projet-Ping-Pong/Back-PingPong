const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Ligne_Achat = sequelize.define(
    'Lignes_Achats',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        prix_achat: { type: DataTypes.FLOAT, allowNull: false },
        quantite: { type: DataTypes.INTEGER, allowNull: false },
        unite: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'Lignes_Achats' },
);

module.exports = Ligne_Achat;