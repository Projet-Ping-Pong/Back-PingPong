const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Gamme = sequelize.define(
    'Gammes',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true, allowNull: false },
        libelle: {type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        responsable: { type: DataTypes.STRING, allowNull: false },
        id_piece: { foreignKey: true, type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: 'Gammes' },
);

module.exports = Gamme;