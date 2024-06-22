const express = require('express');
const router = express.Router();
const machineRepository = require('../models/machine-repository');
const { validateJWT } = require('../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await machineRepository.getAllMachine());
});

router.post('/rechLibelle', async (req, res) => {
    if (req.body.libelle !== "" || req.body.libelle !== null) {
        res.status(200).send(await machineRepository.getMachineByLibelle(req.body.libelle));
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    if (req.body.id !== "" || req.body.id !== null) {
        console.log("machine : " + req.body.id);
        res.status(200).send(await machineRepository.getMachineById(req.body.id));
    }
});

router.post('/add', validateJWT, async (req, res) => {
    res.status(200).send(await machineRepository.createMachine(req.body));
});

router.put('/update/:id', validateJWT, async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        res.status(200).send(await machineRepository.updateMachine(req.params.id, req.body));
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        await machineRepository.deleteMachine(req.params.id)
        res.status(200).send({ success: "Supprimé" });
    }
});

exports.initializeRoutes = () => router;