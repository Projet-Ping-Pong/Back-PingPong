const express = require('express');
const router = express.Router();
const operationRepository = require('../models/operation-repository');
const { validateJWT } = require('../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await operationRepository.getAllOperation());
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
    res.status(200).send(await operationRepository.updateOperation(req.params.id, req.body));
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    res.status(200).send(await operationRepository.deleteOperation(req.params.id));
});

exports.initializeRoutes = () => router;