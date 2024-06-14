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
            libelle: data.libelle || operationFound.libelle,
            description: data.description || operationFound.description,
            temps: data.temps || operationFound.temps,
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