const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const ligneAchatRepository = require('../../../models/Commerce/LigneCmdAchat/ligne_achat-repository');

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await ligneAchatRepository.deleteLigneAchat(req.params.id)
            res.status(200).send({ success: "Ligne d'achat supprimé avec succés" });
        } else {
            res.status(400).send({ erreur: "L'id de la ligne d'achat est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;