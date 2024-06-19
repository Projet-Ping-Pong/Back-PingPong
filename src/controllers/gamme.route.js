const express = require('express');
const router = express.Router();
const gammeRepository = require('../models/gamme-repository');
const { validateJWT } = require('../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await gammeRepository.getAllGamme());
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    console.log(req.body);
    res.status(200).send(await gammeRepository.getPieceByLibelle(req.body.libelle));
});

router.post('/add', validateJWT, async (req, res) => {
    res.status(200).send(await gammeRepository.createGamme(req.body));
});

router.put('/update/:id', validateJWT, async (req, res) => {
    res.status(200).send(await gammeRepository.updatePiece(req.params.id, req.body));
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    await gammeRepository.deletePiece(req.params.id)
    res.status(200).send({success: "Supprimé"});
});

exports.initializeRoutes = () => router;