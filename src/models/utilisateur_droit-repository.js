const UtilisateurDroit = require('../models/utilisateur_droit.model.js');

exports.getUtiDroitByIdUti = async (id_uti) => {
    const droitFound = await UtilisateurDroit.findOne({
        where: {
            id_uti: id_uti,
        }
    });

    return droitFound;
};

exports.createUtiDroit = async (body) => {

    await UtilisateurDroit.create(body);

};