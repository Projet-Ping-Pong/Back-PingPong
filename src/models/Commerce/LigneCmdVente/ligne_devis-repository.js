const { Op } = require('sequelize');
const LigneDevis = require('./ligne_vente.model');

exports.createLigneDevis = async (body) => {
    return await LigneDevis.create(body);
};

exports.getAllLigneDevis = async () => {
    return await LigneDevis.findAll({ limit: 20 });
};

exports.getAllLigneDevisByIdDevis = async (id_devis) => {
    return await LigneDevis.findAll({
        where: {
            id_devis: id_devis,
        }
    });
};

exports.getLigneDevisById = async (id) => {
    const LigneDevisFound = await LigneDevis.findOne({
        where: {
            id: id,
        }
    });

    return LigneDevisFound;
};

exports.getLigneDevisByLibelle = async (libelle) => {
    const LigneDevisFound = await LigneDevis.findAll({
        where: {
            libelle: {
                [Op.iLike]: `%${libelle}%`,
            },
        },
    });

    return LigneDevisFound;
};

exports.getLigneDevisByIdDevisAndPiece = async (id_devis, id_piece) => {
    const LigneDevisFound = await LigneDevis.findOne({
        where: {
            id_devis: id_devis,
            id_piece: id_piece,
        }
    });

    return LigneDevisFound;
};

exports.updateLigneDevis = async (data, id) => {
    const LigneDevisFound = await LigneDevis.findOne({ where: { id } });

    if (!LigneDevisFound) {
        throw new Error("Il n'existe aucune ligne de devis / commande avec l'id : " + id);
    }

    return await LigneDevis.update(
        {
            libelle: data.libelle,
            quantite: data.quantite,
            unite: data.unite,
            prix_vente: data.prix_vente,
            id_piece: data.id_piece,
            id_devis: data.id_devis,
            id_commande: null,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deleteLigneDevis = async (id) => {
    const LigneDevisFound = await LigneDevis.findOne({ where: { id } });

    if (!LigneDevisFound) {
        throw new Error("Il n'existe aucune ligne de devis / commande avec l'id : " + id);
    }

    return await LigneDevis.destroy({ where: { id } });
};