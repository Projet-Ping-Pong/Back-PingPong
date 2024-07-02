const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const droitRepository = require('../../../models/droit-repository');

router.post('/add', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await droitRepository.createDroit(req.body));
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await droitRepository.getAllDroit());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            res.status(200).send(await droitRepository.getDroitById(req.body.id));
        } else {
            res.status(400).send({ erreur: "L'id du droit est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await droitRepository.getDroitByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé du droit est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            res.status(200).send(await droitRepository.updateDroit(req.params.id, req.body))
        } else {
            res.status(400).send({ erreur: "L'id du droit est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await droitRepository.deleteDroit(req.params.id)
            res.status(200).send({ success: "Droit supprimé avec succés" });
        } else {
            res.status(400).send({ erreur: "L'id du droit est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;