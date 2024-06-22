const express = require('express');
const { QueryTypes, Query } = require('sequelize');
const gammeoperationRepository = require('../models/gamme_operation-repository');
const router = express.Router();
const { sequelize } = require('../models/db');
const { validateJWT } = require('../Security/auth');

router.delete('/delete', validateJWT, async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        await gammeoperationRepository.deleteGammeOperationByIdGammeAndIdOperation(req.body.id_gamme, req.body.id_operation)
        res.status(200).send({ success: "Supprimé" });
    }
});

router.post('/getOpByIdGamme', async (req, res) => {
    if (req.body.id_gamme !== "" || req.body.id_gamme !== null) {
        const operations = await sequelize.query(`
            SELECT "Operations".*, "Postes".libelle as "poste", "Machines".libelle as "machine"
	        FROM "Operations" LEFT JOIN "Gammes_Operations" ON "Operations".id = "Gammes_Operations".id_operation 
	            LEFT JOIN "Postes" ON "Operations".id_poste = "Postes".id
	            LEFT JOIN "Machines" ON "Operations".id_machine = "Machines".id
	        WHERE "Gammes_Operations".id_Gamme = :id_gamme `, {
            replacements: { id_gamme: req.body.id_gamme },
            type: QueryTypes.SELECT,
        });

        res.status(200).send(operations);
    }
});

exports.initializeRoutes = () => router;