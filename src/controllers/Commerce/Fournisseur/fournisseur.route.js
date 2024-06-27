const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const fournisseurRepository = require('../../../models/Commerce/Fournisseur/fournisseur-repository');

router.post('/add', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await fournisseurRepository.createFournisseur(req.body));
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await fournisseurRepository.getAllFournisseur());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            res.status(200).send(await fournisseurRepository.getFournisseurById(req.body.id));
        } else {
            res.status(400).send({ erreur: "L'id du fournisseur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechRaisonSociale', async (req, res) => {
    try {
        if (req.body.raison_sociale) {
            res.status(200).send(await fournisseurRepository.getFournisseurByRaisonSociale(req.body.raison_sociale));
        } else {
            res.status(400).send({ erreur: "La raison sociale du fournisseur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            res.status(200).send(await fournisseurRepository.updateFournisseur(req.params.id, req.body));
        } else {
            res.status(400).send({ erreur: "L'id du fournisseur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await fournisseurRepository.deleteFournisseur(req.params.id)
            res.status(200).send({ success: "Fournisseur supprimé avec succés" });
        } else {
            res.status(400).send({ erreur: "L'id du fournisseur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
    
});

exports.initializeRoutes = () => router;