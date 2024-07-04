const { Op } = require('sequelize');
const Piece = require('./piece.model');


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
exports.getPieceByIdWhitoutInter = async (id) => {
    const pieceFound = await Piece.findOne({
        where: {
            id: id,
            type: {
                [Op.not]: 2
            }
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

exports.getPieceCompoByLibelle = async (libelle) => {
    const pieceFound = await Piece.findAll({
        where: {
            libelle: {
                [Op.iLike]: `%${libelle}%`,
            },
            type: {
                [Op.ne]: 1,
            }
          },
    });

    return pieceFound;
};

exports.getPieceLivrableByLibelle = async (libelle) => {
    const pieceFound = await Piece.findAll({
        where: {
            libelle: {
                [Op.iLike]: `%${libelle}%`,
            },
            type: 1,
          },
    });

    return pieceFound;
};

exports.getPieceAchetableByLibelle = async (libelle) => {
    const pieceFound = await Piece.findAll({
        where: {
            libelle: {
                [Op.iLike]: `%${libelle}%`,
            },
            [Op.or]: [{ type: 3 }, { type: 4 }],
            id_fournisseur:  {
                [Op.not]: null
            }
          },
    });

    return pieceFound;
};

exports.createPiece = async (body) => {
    return await Piece.create(body);
};

exports.updatePiece = async (id, data) => {
    const pieceFound = await Piece.findOne({ where: { id } });

    if (!pieceFound) {
        throw new Error('Pas de piece');
    }

    return await Piece.update(
        {
            libelle: data.libelle,
            prix_vente: data.prix_vente,
            prix_catalogue: data.prix_catalogue,
            stock: data.stock,
            unite: data.unite,
            type: data.type,
            id_gamme: data.id_gamme,
            id_fournisseur: data.id_fournisseur,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.updatePieceIdGamme= async (id, id_gamme) => {
    const pieceFound = await Piece.findOne({ where: { id } });

    if (!pieceFound) {
        throw new Error('Pas de pièce');
    }
    return await Piece.update(
        {
            id_gamme: id_gamme,
        },
        { where: { id } },
    );
};

exports.deletePiece = async (id) => {
    await Piece.destroy({ where: { id } });
};