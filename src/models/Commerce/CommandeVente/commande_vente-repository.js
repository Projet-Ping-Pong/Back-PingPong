const { Op } = require('sequelize');
const CommandeVente = require('.//commande_vente.model');

exports.createCommandeVente = async (body) => {
    return await CommandeVente.create(body);
};

exports.getAllCommandeVente = async () => {
    return await CommandeVente.findAll({ limit : 20 });
};

exports.getCommandeVenteById = async (id) => {
    const CommandeVenteFound = await CommandeVente.findOne({
        where: {
            id: id,
        }
    });

    return CommandeVenteFound;
};

exports.getCommandeVenteByLibelle = async (libelle) => {
    const CommandeVenteFound = await CommandeVente.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return CommandeVenteFound;
};

exports.updateCommandeVente = async (id, data) => {
    const CommandeVenteFound = await CommandeVente.findOne({ where: { id } });

    if (!CommandeVenteFound) {
        throw new Error("Il n'existe aucune commande de vente avec l'id : " + id);
    }

    return await CommandeVente.update({
            libelle: data.libelle,
            date: data.date,
            updatedAt: data.updatedAt,
        },
        { where: { id } },
    );
};

exports.deleteCommandeVente = async (id) => {
    const CommandeVenteFound = await CommandeVente.findOne({ where: { id } });

    if (!CommandeVenteFound) {
        throw new Error("Il n'existe aucune commande de vente avec l'id : " + id);
    }

    return await CommandeVente.destroy({ where: { id } });
};