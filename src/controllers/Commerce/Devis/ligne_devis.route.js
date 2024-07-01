const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const ligneDevisRepository = require('../../../models/Commerce/LigneCmdVente/ligne_devis-repository');

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await ligneDevisRepository.deleteLigneDevis(req.params.id)
            res.status(200).send({ success: "Devis supprimé avec succés" });
        } else {
            res.status(400).send({ erreur: "L'id du devis est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;