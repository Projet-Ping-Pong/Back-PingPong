const { Op } = require('sequelize');
const Machine = require('../models/machine.model.js');

exports.createMachine = async (body) => {
    return await Machine.create(body);
};

exports.updateMachine = async (id, data) => {
    const machineFound = await Machine.findOne({ where: { id } });

    if (!machineFound) {
        throw new Error('Pas de machine');
    }

    return await Machine.update(
        {
            libelle: data.libelle || machineFound.libelle,
            description: data.description || machineFound.description,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deleteMachine = async (id) => {
    await Machine.destroy({ where: { id } });
};

exports.getAllMachine = async () => {
    return await Machine.findAll({ limit : 20 });
};

exports.getMachineById = async (id) => {
    const machineFound = await Machine.findOne({
        where: {
            id: id,
        }
    });

    return machineFound;
};

exports.getMachineByLibelle = async (libelle) => {
    const machineFound = await Machine.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return machineFound;
};