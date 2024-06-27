const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Utilisateur_Droit = sequelize.define(
    'Utilisateurs_Droits',
    {
        id_uti: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
        id_droit: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'Utilisateurs_Droits' },
);

module.exports = Utilisateur_Droit;