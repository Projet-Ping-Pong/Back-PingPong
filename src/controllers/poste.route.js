const express = require('express');
const router = express.Router();
const posteRepository = require('../models/poste-repository');
const postemachineRepository = require('../models/poste_machine-repository');
const machineRepository = require('../models/machine-repository');
const { validateJWT } = require('../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await posteRepository.getAllPoste());
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    if (req.body.libelle !== "" || req.body.libelle !== null) {
        res.status(200).send(await posteRepository.getPosteByLibelle(req.body.libelle));
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    if (req.body.id !== "" || req.body.id !== null) {
        const poste = await posteRepository.getPosteById(req.body.id)
        const posteMachine = await postemachineRepository.getAllPosteMachineByIdPoste(req.body.id)
        var listeMachine = []
        for (let i = 0; i < posteMachine.length; i++) {
            const machine = await machineRepository.getMachineById(posteMachine[i].id_machine)
            listeMachine.push(machine)
        }
        res.status(200).send({
            id: poste.id,
            libelle: poste.libelle,
            description: poste.libelle,
            machines: listeMachine
        });
    }
});

router.post('/add', validateJWT, async (req, res) => {
    const poste = await posteRepository.createPoste(req.body)
    await req.body.posteMachine.forEach(element => {
        postemachineRepository.createPosteMachine({
            id_poste: poste.id,
            id_machine: element.id
        })
    });
    res.status(200).send(poste);
});

router.put('/update/:id', validateJWT, async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        const listeMachinesBDD = await postemachineRepository.getAllPosteMachineByIdPoste(req.params.id)
        const listeMachines = req.body.machines
        res.status(200).send(await posteRepository.updatePoste(req.params.id, req.body));
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        await posteRepository.deletePoste(req.params.id)
        res.status(200).send({ success: "Supprimé" });
    }
});

exports.initializeRoutes = () => router;