const express = require('express');
const router = express.Router();
const operationRepository = require('../../../models/Atelier/Operation/operation-repository');
const posteRepository = require('../../../models/Atelier/Poste/poste-repository');
const machineRepository = require('../../../models/Atelier/Machine/machine-repository');
const { validateJWT } = require('../../../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await operationRepository.getAllOperation());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            const operation = await operationRepository.getOperationById(req.body.id)
            var poste = {}
            var machine = {}
            if(operation != null){
                if(operation.id_poste !== null){
                    poste = await posteRepository.getPosteById(operation.id_poste)
                }
                if(operation.id_machine !== null){
                    machine = await machineRepository.getMachineById(operation.id_machine)
                }
            }
    
            res.status(200).send({
                operation: operation,
                poste: poste,
                machine: machine
            });
        } else {
            res.status(400).send({ erreur: "L'id de l'opération est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await operationRepository.getOperationByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé de l'opération est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/add', validateJWT, async (req, res) => {
    try {
        const operation = await operationRepository.createOperation(req.body)
        res.status(200).send(operation);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await operationRepository.updateOperation(req.params.id, req.body));
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id !== "" || req.params.id !== null) {
            await operationRepository.deleteOperation(req.params.id)
            res.status(200).send({ success: "Supprimé" });
        } else {
            res.status(400).send({ erreur: "L'id de l'opération est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;