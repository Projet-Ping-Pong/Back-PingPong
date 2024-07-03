const { Op } = require('sequelize');
const Devis = require('./devis.model');

exports.createDevis = async (body) => {
    return await Devis.create(body);
};

exports.getAllDevis = async () => {
    return await Devis.findAll({ limit : 20 });
};

exports.getDevisById = async (id) => {
    const DevisFound = await Devis.findOne({
        where: {
            id: id,
        }
    });

    return DevisFound;
};

exports.getDevisByLibelle = async (libelle) => {
    const DevisFound = await Devis.findAll({
        where: {
            libelle: {
              [Op.iLike]: `%${libelle}%`,
            },
          },
    });

    return DevisFound;
};

exports.updateDevis = async (id, data) => {
    const DevisFound = await Devis.findOne({ where: { id } });

    if (!DevisFound) {
        throw new Error("Il n'existe aucun devis avec l'id : " + id);
    }

    console.log(id);
    console.log(data);

    return await Devis.update({
            libelle: data.libelle,
            delai: data.delai,
            date: data.date,
            updatedAt: data.updatedAt,
        },
        { where: { id } },
    );
};

// exports.deleteDevis = async (id) => {
//     const DevisFound = await Devis.findOne({ where: { id } });

//     if (!DevisFound) {
//         throw new Error("Il n'existe aucun devis avec l'id : " + id);
//     }

//     return await Devis.destroy({ where: { id } });
// };