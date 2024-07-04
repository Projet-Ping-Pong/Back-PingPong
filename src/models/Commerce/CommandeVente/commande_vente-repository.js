const { Op } = require('sequelize');
const CommandeVente = require('.//commande_vente.model');
const { QueryTypes, Query } = require('sequelize');
const { sequelize } = require('../../db');

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

exports.getCommandesByMois = async (mois) => {
    return await sequelize.query(`SELECT "Commandes_Ventes".id, "Commandes_Ventes".libelle, "Commandes_Ventes".date, "Clients".raison_sociale
        FROM "Commandes_Ventes" LEFT JOIN "Clients" ON "Commandes_Ventes".id_client = "Clients".id
        WHERE EXTRACT(MONTH FROM "Commandes_Ventes".date) = :mois `, {
        replacements: { mois: mois },
        type: QueryTypes.SELECT,
    });
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