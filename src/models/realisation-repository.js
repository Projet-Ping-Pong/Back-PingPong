const { Op } = require('sequelize');
const Rea = require('../models/realisation.model.js');
const { QueryTypes, Query } = require('sequelize');
const { sequelize } = require('../models/db');

exports.createRea = async (body) => {
    return await Rea.create(body);
};

exports.getAllRea = async () => {
    const rea = await sequelize.query(`
        SELECT "Realisations".*, "Postes".libelle as "poste_lib", "Machines".libelle as "machine_lib" 
	    FROM "Realisations" LEFT JOIN "Postes" ON "Realisations".id_poste = "Postes".id
	    LEFT JOIN "Machines" ON "Realisations".id_machine = "Machines".id
	    LIMIT 20 `, {
        type: QueryTypes.SELECT,
    });
    
    return rea;
};

exports.getByID = async (id) => {
    const rea = await sequelize.query(`
        SELECT "Realisations".*, "Postes".libelle as "poste_lib", "Machines".libelle as "machine_lib", "Utilisateurs".nom_uti as "nom_uti", "Pieces".libelle as "piece_lib"
        FROM "Realisations" LEFT JOIN "Postes" ON "Realisations".id_poste = "Postes".id
        LEFT JOIN "Machines" ON "Realisations".id_machine = "Machines".id
        LEFT JOIN "Utilisateurs" ON "Realisations".id_uti = "Utilisateurs".id
        LEFT JOIN "Pieces" ON "Realisations".id_piece = "Pieces".id
        WHERE "Realisations".id = :id `, {
        replacements: { id: id },
        type: QueryTypes.SELECT,
    });
    
    return rea;
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


