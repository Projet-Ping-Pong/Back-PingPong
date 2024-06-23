const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Realisation = sequelize.define(
    'Realisations',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        libelle: { type: DataTypes.STRING, allowNull: false },
        temps: { type: DataTypes.STRING, allowNull: true },
        date: { type: DataTypes.STRING, allowNull: true },
        id_piece: { foreignKey: true, type: DataTypes.INTEGER, allowNull: true },
        id_poste: { foreignKey: true, type: DataTypes.INTEGER, allowNull: true },
        id_machine: { foreignKey: true, type: DataTypes.INTEGER, allowNull: true },
        id_uti: { foreignKey: true, type: DataTypes.INTEGER, allowNull: true },
    },
    { tableName: 'Realisations' },
);

module.exports = Realisation;