const { Op } = require('sequelize');
const Utilisateur = require('./utilisateur.model');
const bcrypt = require('bcryptjs');

exports.createUti = async (body) => {

    const hashedPassword = bcrypt.hashSync(body.mdp, bcrypt.genSaltSync(10));
    const utilisateur = body;
    utilisateur.mdp = hashedPassword;

    return await Utilisateur.create(utilisateur);

};

exports.getAllUtilisateur = async () => {
    return await Utilisateur.findAll({ limit: 20 });
};

exports.getUtiById = async (id) => {
    const utiFound = await Utilisateur.findOne({
        where: {
            id: id,
        }
    });

    return utiFound;
};

exports.getUserByNomUti = async (nom_uti) => {
    const utiFound = await Utilisateur.findOne({
        where: {
            nom_uti: nom_uti,
        }
    });

    return utiFound;
};

exports.getUtiByNomUti = async (nom_uti) => {
    const utiFound = await Utilisateur.findAll({
        where: {
            nom_uti: {
                [Op.iLike]: `%${nom_uti}%`,
            },
        },
    });

    return utiFound;
};

exports.updateUtilisateur = async (id, data) => {
    const UtilisateurFound = await Utilisateur.findOne({ where: { id } });

    if (!UtilisateurFound) {
        throw new Error("Il n'existe aucun utilisateur avec l'id : " + id);
    }

    return await Utilisateur.update({
            nom: data.nom || UtilisateurFound.nom,
            prenom: data.prenom || UtilisateurFound.prenom,
            nom_uti: data.nom_uti || UtilisateurFound.nom_uti,
            mdp: data.mdp ? bcrypt.hashSync(data.mdp, bcrypt.genSaltSync(10)) : UtilisateurFound.mdp,
        },
        { where: { id } },
    );
};

exports.updatePasswordUtilisateur = async (id, data) => {
    const UtilisateurFound = await Utilisateur.findOne({ where: { id } });

    if (!UtilisateurFound) {
        throw new Error("Il n'existe aucun utilisateur avec l'id : " + id);
    }

    return await Utilisateur.update({
            mdp: bcrypt.hashSync(data.mdp, bcrypt.genSaltSync(10)),
        },
        { where: { id } },
    );
};

exports.deleteUtilisateur = async (id) => {
    const UtilisateurFound = await Utilisateur.findOne({ where: { id } });

    if (!UtilisateurFound) {
        throw new Error("Il n'existe aucun utilisateur avec l'id : " + id);
    }

    return await Utilisateur.destroy({ where: { id } });
};