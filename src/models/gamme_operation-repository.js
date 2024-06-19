const { Op } = require('sequelize');
const Gamme = require('../models/gamme_operation.model.js');
const Piece = require('./piece.model.js');


exports.getAllGamme = async () => {
    const gamme = await Gamme.findAll();
    var tabObj = []
    for (let i = 0; i < gamme.length; i++) {
        const piece = await Piece.findOne({
            where: {
                id: gamme[i].id_piece,
            }
        });
        tabObj.push(piece)
    }
    return tabObj
}
// exports.getPieceById = async (id) => {
//     const pieceFound = await Piece.findOne({
//         where: {
//             id: id,
//         }
//     });

//     return pieceFound;
// };

// exports.getPieceByLibelle = async (libelle) => {
//     const pieceFound = await Piece.findAll({
//         where: {
//             libelle: {
//               [Op.iLike]: `%${libelle}%`,
//             },
//           },
//     });

//     return pieceFound;
// };

// exports.createPiece = async (body) => {
//     await Piece.create(body);
// };

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