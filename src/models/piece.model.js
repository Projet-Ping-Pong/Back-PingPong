const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Piece = sequelize.define(
    'Pieces',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        prix_vente: { type: DataTypes.INTEGER, allowNull: true },
        prix_catalogue: { type: DataTypes.INTEGER, allowNull: true },
        stock: { type: DataTypes.INTEGER, allowNull: true },
        unite: { type: DataTypes.STRING, allowNull: true },
        type: { type: DataTypes.INTEGER, allowNull: false },
        id_gamme: { foreignKey: true, type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: 'Pieces' },
);

module.exports = Piece;