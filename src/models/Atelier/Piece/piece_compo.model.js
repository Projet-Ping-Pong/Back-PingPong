const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Piece_Compo = sequelize.define(
    'Pieces_Compos',
    {
        id_piece_composant: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
        id_piece_compose: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
        quantite: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'Pieces_Compos' },
);

module.exports = Piece_Compo;