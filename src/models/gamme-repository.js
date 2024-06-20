const { Op } = require('sequelize');
const Gamme = require('../models/gamme.model.js');
const Piece = require('./piece.model.js');


exports.getAllGamme = async () => {
    return await Gamme.findAll({limit: 20});
}

// exports.getPieceById = async (id) => {
//     const pieceFound = await Piece.findOne({
//         where: {
//             id: id,
//         }
//     });

//     return pieceFound;
// };

exports.getGammeByLibelle = async (libelle) => {
    const gammeFound = await Gamme.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return gammeFound;
};

exports.createGamme = async (body) => {
    return await Gamme.create(body);
};

// // exports.updatePiece = async (id, data) => {
// //     const pieceFound = await Piece.findOne({ where: { id } });

// //     if (!pieceFound) {
// //         throw new Error('Pas de piece');
// //     }

// //     return await Piece.update(
// //         {
// //             libelle: data.libelle || pieceFound.libelle,
// //             description: data.description || pieceFound.description,
// //             updatedAt: data.updatedAt
// //         },
// //         { where: { id } },
// //     );
// // };

// exports.deletePiece = async (id) => {
//     await Piece.destroy({ where: { id } });
// };