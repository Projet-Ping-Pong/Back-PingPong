const { Op } = require('sequelize');
const Poste = require('./poste.model.js');
const { QueryTypes, Query } = require('sequelize');
const { sequelize } = require('../../db.js');

exports.createPoste = async (body) => {
    return await Poste.create(body);
};

exports.updatePoste = async (id, data) => {
    const posteFound = await Poste.findOne({ where: { id } });

    if (!posteFound) {
        throw new Error('Pas de poste');
    }

    return await Poste.update(
        {
            libelle: data.libelle,
            description: data.description,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deletePoste = async (id) => {
    await Poste.destroy({ where: { id } });
};

exports.getAllPoste = async () => {
    return await Poste.findAll({ limit : 20 });
};

exports.getPosteById = async (id) => {
    const posteFound = await Poste.findOne({
        where: {
            id: id,
        }
    });

    return posteFound;
};

exports.getPosteByLibelle = async (libelle) => {
    const posteFound = await Poste.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return posteFound;
};

exports.getPosteByQualification = async (id_uti, rech) => {
    const postes = await sequelize.query(`
        SELECT "Postes".*
        FROM "Postes" LEFT JOIN "Qualifications" ON "Postes".id = "Qualifications".id_poste
        WHERE "Qualifications".id_uti = :id_uti
        AND LOWER("Postes".libelle) LIKE LOWER(:rech) `, {
        replacements: { id_uti: id_uti, rech: `%${rech}%` },
        type: QueryTypes.SELECT,
    });

    return postes;
};