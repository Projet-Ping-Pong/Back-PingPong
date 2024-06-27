const { Op } = require('sequelize');
const Fournisseur = require('../Fournisseur/fournisseur.model');

exports.createFournisseur = async (body) => {
    return await Fournisseur.create(body);
};

exports.getAllFournisseur = async () => {
    return await Fournisseur.findAll({ limit : 20 });
};

exports.getFournisseurById = async (id) => {
    const FournisseurFound = await Fournisseur.findOne({
        where: {
            id: id,
        }
    });

    return FournisseurFound;
};

exports.getFournisseurByRaisonSociale = async (raison_sociale) => {
    const FournisseurFound = await Fournisseur.findAll({
        where: {
            raison_sociale: {
              [Op.iLike]: `%${raison_sociale}%`,
            },
          },
    });

    return FournisseurFound;
};

exports.updateFournisseur = async (id, data) => {
    const FournisseurFound = await Fournisseur.findOne({ where: { id } });

    if (!FournisseurFound) {
        throw new Error("Il n'existe aucun Fournisseur avec l'id : " + id);
    }

    return await Fournisseur.update(
        {
            raison_sociale: data.raison_sociale,
            adresse: data.adresse,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deleteFournisseur = async (id) => {
    const FournisseurFound = await Fournisseur.findOne({ where: { id } });

    if (!FournisseurFound) {
        throw new Error("Il n'existe aucun Fournisseur avec l'id : " + id);
    }

    return await Fournisseur.destroy({ where: { id } });
};