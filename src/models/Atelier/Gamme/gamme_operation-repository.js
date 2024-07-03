const { Op } = require('sequelize');
const GammeOperation = require('./gamme_operation.model.js');
const Piece = require('../Piece/piece.model.js');
const { QueryTypes, Query } = require('sequelize');
const { sequelize } = require('../../db');

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

exports.getAllOpByIdGamme = async (id_gamme) => {
    return await sequelize.query(`
        SELECT "Operations".*, "Postes".libelle as "poste", "Machines".libelle as "machine"
        FROM "Operations" LEFT JOIN "Gammes_Operations" ON "Operations".id = "Gammes_Operations".id_operation 
            LEFT JOIN "Postes" ON "Operations".id_poste = "Postes".id
            LEFT JOIN "Machines" ON "Operations".id_machine = "Machines".id
        WHERE "Gammes_Operations".id_Gamme = :id_gamme `, {
        replacements: { id_gamme: id_gamme },
        type: QueryTypes.SELECT,
    });
}

exports.getGammeOperationByIdGammeAndIdOperation = async (id_gamme, id_operation) => {
    return await GammeOperation.findOne({ where: { id_gamme, id_operation } });
};

exports.deleteGammeOperationByIdGammeAndIdOperation = async (id_gamme, id_operation) => {
    await GammeOperation.destroy({ where: { id_gamme, id_operation } });
};
