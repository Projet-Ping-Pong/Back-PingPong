const express = require('express');
const router = express.Router();
const postemachineRepository = require('../../../models/Atelier/Poste/poste_machine-repository');
const { validateJWT } = require('../../../Security/auth');

router.delete('/delete', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await postemachineRepository.deletePosteMachineByIdPosteAndIdMachine(req.body.id_poste, req.body.id_machine)
            res.status(200).send({ success: "Supprimé" });
        } else {
            res.status(400).send({ erreur: "L'id de la liaison est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    try {
        if (req.body.id_poste) {
            const machines = await postemachineRepository.getAllPosteMachineByLibelle(req.body)
            res.status(200).send(machines);
        } else {
            res.status(400).send({ erreur: "id invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;