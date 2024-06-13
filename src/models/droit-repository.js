const Droit = require('../models/droit.model.js');

exports.getDroitById = async (id) => {
    const droitFound = await Droit.findOne({
        where: {
            id: id,
        }
    });

    return droitFound;
};

exports.createDroit = async (body) => {
    await Droit.create(body);
};