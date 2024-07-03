const express = require('express');
const router = express.Router();
const machineRepository = require('../../../models/Atelier/Machine/machine-repository');
const { validateJWT, validateDroit } = require('../../../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await machineRepository.getAllMachine());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await machineRepository.getMachineByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé de la machine est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            res.status(200).send(await machineRepository.getMachineById(req.body.id));
        } else {
            res.status(400).send({ erreur: "L'id de la machine est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/add', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await machineRepository.createMachine(req.body));
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            res.status(200).send(await machineRepository.updateMachine(req.params.id, req.body));
        } else {
            res.status(400).send({ erreur: "L'id de la machine est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await machineRepository.deleteMachine(req.params.id)
            res.status(200).send({ success: "Supprimé" });
        } else {
            res.status(400).send({ erreur: "L'id de la machine est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;