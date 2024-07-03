const { Op } = require('sequelize');
const Qualification = require('./uti_poste.model');

exports.createQualification = async (body) => {
    await Qualification.create(body);
};

exports.getUtiPosteByIdUti = async (id_uti) => {
    const qualFound = await Qualification.findAll({
        where: {
            id_uti: id_uti,
        }
    });

    return qualFound;
};

exports.getUtiPosteByIdUtiAndPoste = async (id_uti, id_poste) => {
    const qualFound = await Qualification.findOne({
        where: {
            id_uti: id_uti,
            id_poste: id_poste
        }
    });

    return qualFound;
};

exports.deleteUtiPoste = async (id_uti, id_poste) => {
    const utiPosteFound = await Qualification.findOne({
        where: {
            id_uti: id_uti,
            id_poste: id_poste
        }
    });

    if (!utiPosteFound) {
        throw new Error("Il n'existe aucune qualification de l'utilisateur :  " + id_uti + " pour le poste : " + id_poste);
    }

    return await Qualification.destroy({
        where: {
            id_uti: id_uti,
            id_poste: id_poste
        }
    });
};