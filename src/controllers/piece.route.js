const express = require('express');
const router = express.Router();
const pieceRepository = require('../models/piece-repository');

router.get('/getAll', async (req, res) => {
    res.status(200).send(await pieceRepository.getAllPiece());
});

exports.initializeRoutes = () => router;