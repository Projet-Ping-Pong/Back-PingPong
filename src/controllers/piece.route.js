const express = require('express');
const router = express.Router();
const pieceRepository = require('../models/piece-repository');
const { validateJWT } = require('../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await pieceRepository.getAllPiece());
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    console.log(req.body);
    res.status(200).send(await pieceRepository.getPieceByLibelle(req.body.libelle));
});

router.post('/add', validateJWT, async (req, res) => {
    res.status(200).send(await pieceRepository.createPiece(req.body));
});

router.put('/update/:id', validateJWT, async (req, res) => {
    res.status(200).send(await pieceRepository.updatePiece(req.params.id, req.body));
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    await pieceRepository.deletePiece(req.params.id)
    res.status(200).send({success: "Supprimé"});
});

exports.initializeRoutes = () => router;