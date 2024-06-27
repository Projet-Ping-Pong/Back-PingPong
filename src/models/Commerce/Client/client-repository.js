const { Op } = require('sequelize');
const Client = require('../Client/client.model');

exports.createClient = async (body) => {
    return await Client.create(body);
};

exports.getAllClient = async () => {
    return await Client.findAll({ limit : 20 });
};

exports.getClientById = async (id) => {
    const clientFound = await Client.findOne({
        where: {
            id: id,
        }
    });

    return clientFound;
};

exports.getClientByRaisonSociale = async (raison_sociale) => {
    const clientFound = await Client.findAll({
        where: {
            raison_sociale: {
              [Op.iLike]: `%${raison_sociale}%`,
            },
          },
    });

    return clientFound;
};

exports.updateClient = async (id, data) => {
    const clientFound = await Client.findOne({ where: { id } });

    if (!clientFound) {
        throw new Error("Il n'existe aucun client avec l'id : " + id);
    }

    return await Client.update(
        {
            raison_sociale: data.raison_sociale,
            adresse: data.adresse,
            updatedAt: data.updatedAt
        },
        { where: { id } },
    );
};

exports.deleteClient = async (id) => {
    const clientFound = await Client.findOne({ where: { id } });

    if (!clientFound) {
        throw new Error("Il n'existe aucun client avec l'id : " + id);
    }

    return await Client.destroy({ where: { id } });
};