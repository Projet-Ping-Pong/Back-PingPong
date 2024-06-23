const express = require('express');
const router = express.Router();
const utiRepository = require('../models/utilisateur-repository');
const { validateJWT } = require('../Security/auth');


router.post('/rechNomUti', validateJWT, async (req, res) => {
    res.status(200).send(await utiRepository.getUtiByNomUti(req.body.nom_uti));
});

router.post('/getId', validateJWT, async (req, res) => {
    res.status(200).send(await utiRepository.getUtiById(req.body.id));
});

exports.initializeRoutes = () => router;


