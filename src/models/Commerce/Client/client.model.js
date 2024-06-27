const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Client = sequelize.define(
    'Clients',
    {
        id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
        raison_sociale: { type: DataTypes.STRING, allowNull: false },
        adresse: { type: DataTypes.STRING, allowNull: true },
    },
    { tableName: 'Clients' },
);

module.exports = Client;