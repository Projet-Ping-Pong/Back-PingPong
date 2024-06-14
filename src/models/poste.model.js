const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Poste = sequelize.define(
    'Postes',
    {
        id_poste: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: true },
        occupe: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    { tableName: 'Postes' },
);

module.exports = Poste;