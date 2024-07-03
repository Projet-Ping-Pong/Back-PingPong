const express = require('express');
const router = express.Router();
const realisationRepository = require('../../../models/Atelier/Realisation/realisation-repository');
const { validateJWT } = require('../../../Security/auth');

router.post('/add', validateJWT, async (req, res) => {
    try {
        await req.body.listeRea.forEach(element => {
            realisationRepository.createRea(element)
        });
        res.status(200).send({success: "Création"});
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await realisationRepository.getAllRea());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getById', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await realisationRepository.getByID(req.body.id));
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await realisationRepository.getReaByLibelle(req.body.libelle));
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;