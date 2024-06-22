const { Op } = require('sequelize');
const GammeOperation = require('../models/gamme_operation.model.js');
const Piece = require('./piece.model.js');

exports.createGammeOperation = async (body) => {

    await GammeOperation.create(body);

};

exports.getAllGamme = async () => {
    const gamme = await GammeOperation.findAll();
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

exports.getGammeOperationByIdGammeAndIdOperation = async (id_gamme, id_operation) => {
    return await GammeOperation.findOne({ where: { id_gamme, id_operation } });
};

exports.deleteGammeOperationByIdGammeAndIdOperation = async (id_gamme, id_operation) => {
    await GammeOperation.destroy({ where: { id_gamme, id_operation } });
};
