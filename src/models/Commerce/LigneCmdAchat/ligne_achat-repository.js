const { Op } = require('sequelize');
const LigneAchat = require('./ligne_achat.model');

exports.createLigneAchat = async (body) => {
    return await LigneAchat.create(body);
};

exports.getAllLigneAchat = async () => {
    return await LigneAchat.findAll({ limit: 20 });
};

exports.getAllLigneAchatByIdCommande = async (id_commande) => {
    return await LigneAchat.findAll({
        where: {
            id_commande: id_commande,
        }
    });
};

exports.getLigneAchatById = async (id) => {
    const LigneAchatFound = await LigneAchat.findOne({
        where: {
            id: id,
        }
    });

    return LigneAchatFound;
};

exports.getLigneAchatByLibelle = async (libelle) => {
    const LigneAchatFound = await LigneAchat.findAll({
        where: {
            libelle: {
                [Op.iLike]: `%${libelle}%`,
            },
        },
    });

    return LigneAchatFound;
};

exports.getLigneAchatByIdCommandeAndPiece = async (id_commande, id_piece) => {
    const LigneAchatFound = await LigneAchat.findOne({
        where: {
            id_commande: id_commande,
            id_piece: id_piece,
        }
    });

    return LigneAchatFound;
};

exports.updateLigneAchat = async (data, id) => {
    const LigneAchatFound = await LigneAchat.findOne({ where: { id } });

    if (!LigneAchatFound) {
        throw new Error("Il n'existe aucune ligne de d'achat avec l'id : " + id);
    }

    return await LigneAchat.update(
        {
            libelle: data.libelle,
            quantite: data.quantite,
            unite: data.unite,
            prix_achat: data.prix_achat,
            id_piece: data.id_piece,
            id_commande: data.id_commande,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deleteLigneAchat = async (id) => {
    const LigneAchatFound = await LigneAchat.findOne({ where: { id } });

    if (!LigneAchatFound) {
        throw new Error("Il n'existe aucune ligne d'achat avec l'id : " + id);
    }

    return await LigneAchat.destroy({ where: { id } });
};