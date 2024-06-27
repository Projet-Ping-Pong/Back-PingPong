const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Qualification = sequelize.define(
    'Qualifications',
    {
        id_uti: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
        id_poste: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'Qualifications' },
);

module.exports = Qualification;