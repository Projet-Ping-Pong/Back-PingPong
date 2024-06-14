const express = require('express');
const router = express.Router();
const operationRepository = require('../models/operation-repository');

router.get('/getAll', async (req, res) => {
    res.status(200).send(await operationRepository.getAllOperation());
});

router.post('/add', async (req, res) => {
    res.status(200).send(await operationRepository.createOperation(req.body));
});

router.put('/update/:id', async (req, res) => {
    res.status(200).send(await operationRepository.updateOperation(req.params.id, req.body));
});

router.delete('/delete/:id', async (req, res) => {
    res.status(200).send(await operationRepository.deleteOperation(req.params.id));
});

exports.initializeRoutes = () => router;