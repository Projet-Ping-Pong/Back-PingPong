const express = require('express');
const { QueryTypes, Query } = require('sequelize');
const router = express.Router();
const postemachineRepository = require('../models/poste_machine-repository');
const { sequelize } = require('../models/db');
const { validateJWT } = require('../Security/auth');

router.delete('/delete', validateJWT, async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        await postemachineRepository.deletePosteMachineByIdPosteAndIdMachine(req.body.id_poste, req.body.id_machine)
        res.status(200).send({ success: "Supprimé" });
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    if (req.body.id_poste !== "" || req.body.id_poste !== null) {
        const machines = await sequelize.query(`SELECT "Machines".* FROM "Machines", "Postes_Machines" 
            WHERE "Machines".id = "Postes_Machines".id_machine
	        AND "Postes_Machines".id_poste = :id_poste
	        AND LOWER("Machines".libelle) LIKE LOWER(:rech) `, {
            replacements: { id_poste: req.body.id_poste, rech: `%${req.body.libelle}%` },
            type: QueryTypes.SELECT,
          });
        res.status(200).send(machines);
    }
});

exports.initializeRoutes = () => router;