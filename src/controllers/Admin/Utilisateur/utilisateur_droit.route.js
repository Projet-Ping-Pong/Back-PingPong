const express = require('express');
const router = express.Router();
const utilisateurDroitRepository = require('../../../models/utilisateur_droit-repository');

const { validateJWT } = require('../../../Security/auth');

router.delete('/delete', validateJWT, async (req, res) => {
    try {
        if (req.body.id_uti) {
            if(req.body.id_droit){
                await utilisateurDroitRepository.deleteUtiDroit(req.body.id_uti, req.body.id_droit)
                res.status(200).send({ success: "Droit de l'utilisateur supprimé avec succés" });
            } else {
                res.status(400).send({ erreur: "L'id du droit est invalide" });
            }
        } else {
            res.status(400).send({ erreur: "L'id de l'utilisateur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;


