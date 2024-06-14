const express = require('express');
const router = express.Router();
const pieceRepository = require('../models/piece-repository');

router.get('/getAll', async (req, res) => {
    res.status(200).send(await pieceRepository.getAllPiece());
});

router.post('/rechLibelle', async (req, res) => {
    console.log(req.body);
    res.status(200).send(await pieceRepository.getPieceByLibelle(req.body.libelle));
});


router.post('/add', async (req, res) => {
    res.status(200).send(await pieceRepository.createPiece(req.body));
});

router.put('/update/:id', async (req, res) => {
    res.status(200).send(await pieceRepository.updatePiece(req.params.id, req.body));
});

router.delete('/delete/:id', async (req, res) => {
    await pieceRepository.deletePiece(req.params.id)
    res.status(200).send({error: "OK"});
});

exports.initializeRoutes = () => router;