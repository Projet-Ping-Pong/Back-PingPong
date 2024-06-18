const PosteMachine = require('../models/poste_machine.model.js');

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

exports.deletePosteMachineByIdPoste = async (id_poste) => {
    await PosteMachine.destroy({ where: { id_poste } });
};

exports.getAllPosteMachineByIdPoste = async (id_poste) => {
    return await PosteMachine.findAll({ where: { id_poste } });
};