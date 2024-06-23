const { Op } = require('sequelize');
const Gamme = require('../models/gamme.model.js');
const Piece = require('./piece.model.js');
const { sequelize } = require('../models/db');
const { QueryTypes, Query } = require('sequelize');


exports.getAllGamme = async () => {
    const gammes = await sequelize.query(`SELECT "Gammes".*, "Pieces".libelle as "lib_piece" FROM "Gammes"
            LEFT JOIN "Pieces" ON "Gammes".id_piece = "Pieces".id
            LIMIT 20`, {
        type: QueryTypes.SELECT,
        });
    return gammes;
}

exports.getGammeById = async (id) => {
    const gammeFound = await Gamme.findOne({
        where: {
            id: id,
        }
    });

    return gammeFound;
};

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

exports.updateGamme = async (id, data) => {
    const gammeFound = await Gamme.findOne({ where: { id } });

    if (!gammeFound) {
        throw new Error('Pas de gamme');
    }
    return await Gamme.update(
        {
            libelle: data.libelle,
            description: data.description,
            responsable: data.responsable,
            id_piece: data.id_piece,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.updateGammeIdPiece= async (id, id_piece) => {
    const gammeFound = await Gamme.findOne({ where: { id } });

    if (!gammeFound) {
        throw new Error('Pas de gamme');
    }
    return await Gamme.update(
        {
            id_piece: id_piece,
        },
        { where: { id } },
    );
};

exports.deleteGamme = async (id) => {
    await Gamme.destroy({ where: { id } });
};