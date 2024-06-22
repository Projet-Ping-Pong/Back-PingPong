const express = require('express');
const router = express.Router();
const operationRepository = require('../models/operation-repository');
const posteRepository = require('../models/poste-repository');
const machineRepository = require('../models/machine-repository');
const { validateJWT } = require('../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await operationRepository.getAllOperation());
});

router.post('/getId', validateJWT, async (req, res) => {
    if (req.body.id !== "" || req.body.id !== null) {
        const operation = await operationRepository.getOperationById(req.body.id)
        const poste = {}
        const machine = {}
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
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    if (req.body.libelle !== "" || req.body.libelle !== null) {
        res.status(200).send(await operationRepository.getOperationByLibelle(req.body.libelle));
    }
});

router.post('/add', validateJWT, async (req, res) => {
    const operation = await operationRepository.createOperation(req.body)
    res.status(200).send(operation);
});

router.put('/update/:id', validateJWT, async (req, res) => {
    console.log(req.body);
    res.status(200).send(await operationRepository.updateOperation(req.params.id, req.body));
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        await operationRepository.deleteOperation(req.params.id)
        res.status(200).send({ success: "Supprimé" });
    }
});

exports.initializeRoutes = () => router;