const { Op } = require('sequelize');
const CommandeAchat = require('./commande_achat.model');

exports.createCommandeAchat = async (body) => {
    return await CommandeAchat.create(body);
};

exports.getAllCommandeAchat = async () => {
    return await CommandeAchat.findAll({ limit : 20 });
};

exports.getCommandeAchatById = async (id) => {
    const CommandeAchatFound = await CommandeAchat.findOne({
        where: {
            id: id,
        }
    });

    return CommandeAchatFound;
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