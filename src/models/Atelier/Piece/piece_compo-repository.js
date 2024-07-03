const PieceCompo = require('./piece_compo.model.js');
const { sequelize } = require('../../db.js');
const { QueryTypes, Query } = require('sequelize');

exports.createPieceCompo = async (body) => {
    return await PieceCompo.create(body);
};

exports.getAllPieceCompoByIdPiece = async (id_piece_composant) => {
    return await sequelize.query(`
        SELECT "Pieces".*, "Pieces_Compos".quantite
        FROM "Pieces" LEFT JOIN "Pieces_Compos" ON "Pieces".id = "Pieces_Compos".id_piece_compose
        WHERE "Pieces_Compos".id_piece_composant = :id_piece `, {
        replacements: { id_piece: id_piece_composant },
        type: QueryTypes.SELECT,
    });
};

exports.getPieceCompoByIdPieceAndCompo = async (id_piece_composant, id_piece_compose) => {
    return await PieceCompo.findAll({ 
        where: {
            id_piece_composant,
            id_piece_compose,
        }
    });
};

exports.updatePieceCompo = async (compo, id_piece_composant, id_piece_compose) => {
    return await PieceCompo.update(compo,{ where: { id_piece_composant, id_piece_compose } });
};

exports.deletePieceCompo = async (id_piece_composant, id_piece_compose) => {
    return await PieceCompo.destroy({ where: { id_piece_composant, id_piece_compose } });
};