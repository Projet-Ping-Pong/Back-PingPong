const { Op } = require('sequelize');
const Piece = require('../models/piece.model.js');


exports.getAllPiece = async () => {
    return await Piece.findAll({ limit: 20 });
};

exports.getPieceById = async (id) => {
    const pieceFound = await Piece.findOne({
        where: {
            id: id,
        }
    });

    return pieceFound;
};

exports.getPieceByLibelle = async (libelle) => {
    const pieceFound = await Piece.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return pieceFound;
};

exports.createPiece = async (body) => {
    await Piece.create(body);
};