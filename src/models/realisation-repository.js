const { Op } = require('sequelize');
const Rea = require('../models/realisation.model.js');

exports.createRea = async (body) => {
    return await Rea.create(body);
};

exports.getAllRea = async () => {
    return await Rea.findAll({ limit: 20 });
};

exports.getReaByLibelle = async (libelle) => {
    const reaFound = await Rea.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return reaFound;
};