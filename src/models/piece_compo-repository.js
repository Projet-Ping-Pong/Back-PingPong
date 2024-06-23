const { Op } = require('sequelize');
const PieceCompo = require('../models/piece_compo.model.js');

exports.createPieceCompo = async (body) => {
    await PieceCompo.create(body);
};

exports.getAllPieceCompoByIdPiece = async (id_piece_composant) => {
    await PieceCompo.findAll({ where: { id_piece_composant } });
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
    await PieceCompo.update(compo,{ where: { id_piece_composant, id_piece_compose } });
};

exports.deletePieceCompo = async (id_piece_composant, id_piece_compose) => {
    await PieceCompo.destroy({ where: { id_piece_composant, id_piece_compose } });
};