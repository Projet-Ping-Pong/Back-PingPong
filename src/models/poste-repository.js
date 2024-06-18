const { Op } = require('sequelize');
const Poste = require('../models/poste.model.js');

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
            libelle: data.libelle || posteFound.libelle,
            description: data.description || posteFound.description,
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