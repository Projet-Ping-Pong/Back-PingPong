const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Piece = sequelize.define(
    'Pieces',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        prix_vente: { type: DataTypes.STRING, allowNull: true },
        prix_catalogue: { type: DataTypes.STRING, allowNull: true },
        stock: { type: DataTypes.STRING, allowNull: true },
        unite: { type: DataTypes.STRING, allowNull: true },
        type: { type: DataTypes.STRING, allowNull: true },
        g_libelle: { type: DataTypes.STRING, allowNull: true },
        g_desc: { type: DataTypes.STRING, allowNull: true },
    },
    { tableName: 'Pieces' },
);

module.exports = Piece;