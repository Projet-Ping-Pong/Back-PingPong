const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const ligneVenteRepository = require('../../../models/Commerce/LigneCmdVente/ligne_vente-repository');

router.post('/getAllLigneClient', validateJWT, async (req, res) => {
    try {
        commandeVente = await ligneVenteRepository.getAllLigneVenteByIdClient(req.body.id_client)
        res.status(200).send(commandeVente);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getAllLigneClientWithoutCommande', validateJWT, async (req, res) => {
    try {
        commandeVente = await ligneVenteRepository.getAllLigneVenteByIdClientWithoutCommande(req.body.id_client)
        res.status(200).send(commandeVente);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await ligneVenteRepository.updateLigneVenteIdCommande(req.params.id, null)
            res.status(200).send({ success: "Ligne de commande supprimée avec succés" });
        } else {
            res.status(400).send({ erreur: "L'id de la ligne est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;