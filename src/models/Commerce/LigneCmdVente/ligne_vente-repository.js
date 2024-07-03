const { Op } = require('sequelize');
const LigneVente = require('./ligne_vente.model');
const { QueryTypes, Query } = require('sequelize');
const { sequelize } = require('../../../models/db');

exports.getAllLigneVenteByIdClient = async (id_client) => {
    return await sequelize.query(`
        SELECT "Lignes_Ventes".* 
	    FROM "Devis" RIGHT JOIN "Lignes_Ventes" ON "Lignes_Ventes".id_devis = "Devis".id
	    WHERE "Devis".delai > NOW()
	    AND "Devis".id_client = :id_client
        ORDER BY id ASC `, {
        replacements: { id_client: id_client },
        type: QueryTypes.SELECT,
    });
};

exports.getAllLigneVenteByIdClientWithoutCommande = async (id_client) => {
    return await sequelize.query(`
        SELECT "Lignes_Ventes".* 
	    FROM "Devis" RIGHT JOIN "Lignes_Ventes" ON "Lignes_Ventes".id_devis = "Devis".id
	    WHERE "Devis".delai > NOW()
	    AND "Devis".id_client = :id_client
	 	AND "Lignes_Ventes".id_commande IS NULL
        ORDER BY id ASC `, {
        replacements: { id_client: id_client },
        type: QueryTypes.SELECT,
    });
};

exports.createLigneVente = async (body) => {
    return await LigneVente.create(body);
};

exports.updateLigneVenteIdCommande = async (id, id_commande) => {
    return await LigneVente.update(
        {
            id_commande: id_commande,
        },
        { where: { id } })
};

// exports.getAllLigneVente = async () => {
//     return await LigneVente.findAll({ limit: 20 });
// };

exports.getAllLigneVenteByIdCommande = async (id_commande) => {
    return await LigneVente.findAll({
        where: {
            id_commande: id_commande,
        }
    });
};

// exports.getLigneVenteById = async (id) => {
//     const LigneVenteFound = await LigneVente.findOne({
//         where: {
//             id: id,
//         }
//     });

//     return LigneVenteFound;
// };

// exports.getLigneVenteByLibelle = async (libelle) => {
//     const LigneVenteFound = await LigneVente.findAll({
//         where: {
//             libelle: {
//                 [Op.iLike]: `%${libelle}%`,
//             },
//         },
//     });

//     return LigneVenteFound;
// };

// exports.getLigneVenteByIdDevisAndPiece = async (id_devis, id_piece) => {
//     const LigneVenteFound = await LigneVente.findOne({
//         where: {
//             id_devis: id_devis,
//             id_piece: id_piece,
//         }
//     });

//     return LigneVenteFound;
// };

// exports.updateLigneVente = async (data, id) => {
//     const LigneVenteFound = await LigneVente.findOne({ where: { id } });

//     if (!LigneVenteFound) {
//         throw new Error("Il n'existe aucune ligne de devis / commande avec l'id : " + id);
//     }

//     return await LigneVente.update(
//         {
//             libelle: data.libelle,
//             quantite: data.quantite,
//             unite: data.unite,
//             prix_vente: data.prix_vente,
//             id_piece: data.id_piece,
//             id_devis: data.id_devis,
//             id_commande: null,
//             updatedAt: data.updatedAt
//         },
//         { where: { id } },
//     );
// };

// exports.deleteLigneVente = async (id) => {
//     const LigneVenteFound = await LigneVente.findOne({ where: { id } });

//     if (!LigneVenteFound) {
//         throw new Error("Il n'existe aucune ligne de devis / commande avec l'id : " + id);
//     }

//     return await LigneVente.destroy({ where: { id } });
// };