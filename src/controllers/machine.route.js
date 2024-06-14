const express = require('express');
const router = express.Router();
const machineRepository = require('../models/machine-repository');

router.get('/getAll', async (req, res) => {
    res.status(200).send(await machineRepository.getAllMachine());
});

router.post('/add', async (req, res) => {
    res.status(200).send(await machineRepository.createMachine(req.body));
});

router.put('/update/:id', async (req, res) => {
    res.status(200).send(await machineRepository.updateMachine(req.params.id, req.body));
});

router.delete('/delete/:id', async (req, res) => {
    res.status(200).send(await machineRepository.deleteMachine(req.params.id));
});

exports.initializeRoutes = () => router;