const PosteMachine = require('./poste_machine.model');
const { QueryTypes, Query } = require('sequelize');
const { sequelize } = require('../../db');

exports.createPosteMachine = async (body) => {

    await PosteMachine.create(body);

};

exports.updatePosteMachine = async (id_poste, data) => {
    const posteMachineFound = await PosteMachine.findOne({ where: { id_poste } });

    if (!posteFound) {
        throw new Error('Pas de poste');
    }

    return await PosteMachine.update(
        {
            id_poste: data.libelle || posteMachineFound.id_poste,
            id_machine: data.description || posteMachineFound.id_machine,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deletePosteMachineByIdPosteAndIdMachine = async (id_poste, id_machine) => {
    await PosteMachine.destroy({ where: { id_poste, id_machine } });
};

exports.getAllPosteMachineByLibelle = async (body) => {
    return await sequelize.query(`SELECT "Machines".* FROM "Machines", "Postes_Machines" 
        WHERE "Machines".id = "Postes_Machines".id_machine
        AND "Postes_Machines".id_poste = :id_poste
        AND LOWER("Machines".libelle) LIKE LOWER(:rech) `, {
        replacements: { id_poste: body.id_poste, rech: `%${body.libelle}%` },
        type: QueryTypes.SELECT,
      });
};

exports.getAllPosteMachineByIdPoste = async (id_poste) => {
    return await PosteMachine.findAll({ where: { id_poste } });
};

exports.getPosteMachineByIdPosteAndIdMachine = async (id_poste, id_machine) => {
    return await PosteMachine.findOne({ where: { id_poste, id_machine } });
};