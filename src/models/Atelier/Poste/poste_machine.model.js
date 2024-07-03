const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db');

const Poste_Machine = sequelize.define(
    'Postes_Machines',
    {
        id_poste: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
        id_machine: { primaryKey: true, type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: 'Postes_Machines' },
);

module.exports = Poste_Machine;