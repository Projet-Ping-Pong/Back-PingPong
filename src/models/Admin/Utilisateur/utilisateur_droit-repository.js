const UtilisateurDroit = require('./utilisateur_droit.model');

exports.getUtiDroitByIdUti = async (id_uti) => {
    const droitFound = await UtilisateurDroit.findAll({
        where: {
            id_uti: id_uti,
        }
    });

    return droitFound;
};

exports.getUtiDroitByIdUtiAndDroit = async (id_uti, id_droit) => {
    const droitFound = await UtilisateurDroit.findOne({
        where: {
            id_uti: id_uti,
            id_droit: id_droit
        }
    });

    return droitFound;
};

exports.createUtiDroit = async (body) => {

    await UtilisateurDroit.create(body);

};

exports.updateUtiDroit = async (id, data) => {
    const utiDroitFound = await UtilisateurDroit.findOne({ where: { id } });

    if (!utiDroitFound) {
        throw new Error("Il n'existe aucun droit utilisateur avec l'id : " + id);
    }

    return await UtilisateurDroit.update(
        {
            id_uti: data.id_uti,
            id_droit: data.id_droit,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deleteUtiDroit = async (id_uti, id_droit) => {
    const utiDroitFound = await UtilisateurDroit.findOne({
        where: {
            id_uti: id_uti,
            id_droit: id_droit
        }
    });

    if (!utiDroitFound) {
        throw new Error("Il n'existe aucun droit pour l'utilisateur avec l'id : " + id_uti + " et le droit : " + id_droit);
    }

    return await UtilisateurDroit.destroy({
        where: {
            id_uti: id_uti,
            id_droit: id_droit
        }
    });
};