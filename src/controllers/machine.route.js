const express = require('express');
const router = express.Router();
const machineRepository = require('../models/machine-repository');

router.get('/getAll', async (req, res) => {
    res.status(200).send(await machineRepository.getAllMachine());
});

router.post('/rechLibelle', async (req, res) => {
    if (req.body.libelle !== "" || req.body.libelle !== null) {
        res.status(200).send(await machineRepository.getMachineByLibelle(req.body.libelle));
    }
});

router.post('/getId', async (req, res) => {
    if (req.body.id !== "" || req.body.id !== null) {
        res.status(200).send(await machineRepository.getMachineById(req.body.id));
    }
});

router.post('/add', async (req, res) => {
    res.status(200).send(await machineRepository.createMachine(req.body));
});

router.put('/update/:id', async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        res.status(200).send(await machineRepository.updateMachine(req.params.id, req.body));
    }
});

router.delete('/delete/:id', async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        await machineRepository.deleteMachine(req.params.id)
        res.status(200).send({ success: "Supprimé" });
    }
});

exports.initializeRoutes = () => router;