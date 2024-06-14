const express = require('express');
const router = express.Router();
const posteRepository = require('../models/poste-repository');

router.get('/getAll', async (req, res) => {
    res.status(200).send(await posteRepository.getAllPoste());
});

router.post('/add', async (req, res) => {
    res.status(200).send(await posteRepository.createPoste(req.body));
});

router.put('/update/:id', async (req, res) => {
    res.status(200).send(await posteRepository.updatePoste(req.params.id, req.body));
});

router.delete('/delete/:id', async (req, res) => {
    res.status(200).send(await posteRepository.deletePoste(req.params.id));
});

exports.initializeRoutes = () => router;