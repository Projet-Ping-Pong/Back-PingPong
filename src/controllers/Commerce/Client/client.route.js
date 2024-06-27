const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const clientRepository = require('../../../models/Commerce/Client/client-repository');

router.post('/add', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await clientRepository.createClient(req.body));
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await clientRepository.getAllClient());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            res.status(200).send(await clientRepository.getClientById(req.body.id));
        } else {
            res.status(400).send({ erreur: "L'id du client est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechRaisonSociale', async (req, res) => {
    try {
        if (req.body.raison_sociale) {
            res.status(200).send(await clientRepository.getClientByRaisonSociale(req.body.raison_sociale));
        } else {
            res.status(400).send({ erreur: "La raison sociale du client est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            res.status(200).send(await clientRepository.updateClient(req.params.id, req.body));
        } else {
            res.status(400).send({ erreur: "L'id du client est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await clientRepository.deleteClient(req.params.id)
            res.status(200).send({ success: "Client supprimé avec succés" });
        } else {
            res.status(400).send({ erreur: "L'id du client est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
    
});

exports.initializeRoutes = () => router;