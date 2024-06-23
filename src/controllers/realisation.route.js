const express = require('express');
const router = express.Router();
const realisationRepository = require('../models/realisation-repository');

const { validateJWT } = require('../Security/auth');

router.post('/add', validateJWT, async (req, res) => {
   
    await req.body.listeRea.forEach(element => {
        realisationRepository.createRea(element)
    });
    res.status(200).send({success: "Création"});
});

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await realisationRepository.getAllRea());
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    console.log(req.body);
    res.status(200).send(await realisationRepository.getReaByLibelle(req.body.libelle));
});

exports.initializeRoutes = () => router;