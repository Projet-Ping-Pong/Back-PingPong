const { Op } = require('sequelize');
const CommandeAchat = require('./commande_achat.model');
const { QueryTypes, Query } = require('sequelize');
const { sequelize } = require('../../db');

exports.createCommandeAchat = async (body) => {
    return await CommandeAchat.create(body);
};

exports.getAllCommandeAchat = async () => {
    return await CommandeAchat.findAll({ limit: 20 });
};

exports.getCommandeAchatById = async (id) => {
    const CommandeAchatFound = await CommandeAchat.findOne({
        where: {
            id: id,
        }
    });

    return CommandeAchatFound;
};

exports.getCommandesByMois = async (mois) => {
    return await sequelize.query(`SELECT "Commandes_Achats".id, "Commandes_Achats".libelle, "Commandes_Achats".date, "Fournisseurs".raison_sociale
        FROM "Commandes_Achats" LEFT JOIN "Fournisseurs" ON "Commandes_Achats".id_fournisseur = "Fournisseurs".id
        WHERE EXTRACT(MONTH FROM "Commandes_Achats".date) = :mois `, {
        replacements: { mois: mois },
        type: QueryTypes.SELECT,
    });
};

exports.getCommandeAchatByLibelle = async (libelle) => {
    const CommandeAchatFound = await CommandeAchat.findAll({
        where: {
            libelle: {
                [Op.iLike]: `%${libelle}%`,
            },
        },
    });

    return CommandeAchatFound;
};

exports.updateCommandeAchat = async (id, data) => {
    const CommandeAchatFound = await CommandeAchat.findOne({ where: { id } });

    if (!CommandeAchatFound) {
        throw new Error("Il n'existe aucune commande d'achat avec l'id : " + id);
    }

    return await CommandeAchat.update({
        libelle: data.libelle,
        date_liv_prevue: data.date_liv_prevue,
        date_liv_reelle: data.date_liv_reelle,
        date: data.date,
        updatedAt: data.updatedAt,
    },
        { where: { id } },
    );
};

exports.deleteCommandeAchat = async (id) => {
    const CommandeAchatFound = await CommandeAchat.findOne({ where: { id } });

    if (!CommandeAchatFound) {
        throw new Error("Il n'existe aucune commande d'achat avec l'id : " + id);
    }

    return await CommandeAchat.destroy({ where: { id } });
};