const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Utilisateur = sequelize.define(
    'Utilisateurs',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        nom: { type: DataTypes.STRING, allowNull: true },
        prenom: { type: DataTypes.STRING, allowNull: true },
        nom_uti: { type: DataTypes.STRING, allowNull: false },
        mdp: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'Utilisateurs' },
);

module.exports = Utilisateur;