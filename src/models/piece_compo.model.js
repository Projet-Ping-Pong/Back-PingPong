const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Piece_Compo = sequelize.define(
    'Pieces_Compos',
    {
        quantite: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'Pieces_Compos' },
);

module.exports = Piece_Compo;