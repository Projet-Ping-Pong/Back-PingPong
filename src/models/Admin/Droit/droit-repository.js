const { Op } = require('sequelize');
const Droit = require('./droit.model');

exports.createDroit = async (body) => {
    return await Droit.create(body);
};

exports.getAllDroit = async () => {
    return await Droit.findAll({ limit : 20 });
};

exports.getDroitById = async (id) => {
    const droitFound = await Droit.findOne({
        where: {
            id: id,
        }
    });

    return droitFound;
};

exports.getDroitByLibelle = async (libelle) => {
    const DroitFound = await Droit.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return DroitFound;
};

exports.updateDroit = async (id, data) => {
    const DroitFound = await Droit.findOne({ where: { id } });

    if (!DroitFound) {
        throw new Error("Il n'existe aucun droit avec l'id : " + id);
    }

    return await Droit.update(
        {
            libelle: data.libelle,
            niveau: data.niveau,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deleteDroit = async (id) => {
    const DroitFound = await Droit.findOne({ where: { id } });

    if (!DroitFound) {
        throw new Error("Il n'existe aucun droit avec l'id : " + id);
    }

    return await Droit.destroy({ where: { id } });
};