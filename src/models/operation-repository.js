const { Op } = require('sequelize');
const Operation = require('../models/operation.model.js');

exports.createOperation = async (body) => {
    return await Operation.create(body);
};

exports.updateOperation = async (id, data) => {
    const operationFound = await Operation.findOne({ where: { id } });

    if (!operationFound) {
        throw new Error("Pas d'opération");
    }

    return await Operation.update(
        {
            libelle: data.libelle,
            description: data.description,
            temps: data.temps,
            id_poste: data.id_poste,
            id_machine: data.id_machine,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deleteOperation = async (id) => {
    await Operation.destroy({ where: { id } });
};

exports.getAllOperation = async () => {
    return await Operation.findAll({ limit : 20 });
};

exports.getOperationById = async (id) => {
    const operationFound = await Operation.findOne({
        where: {
            id: id,
        }
    });

    return operationFound;
};

exports.getOperationByLibelle = async (libelle) => {
    const operationFound = await Operation.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return operationFound;
};