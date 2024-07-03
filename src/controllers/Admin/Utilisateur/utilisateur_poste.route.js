const express = require('express');
const router = express.Router();
const utilisateurPosteRepository = require('../../../models/Admin/Qualification/uti_poste-repository');

const { validateJWT } = require('../../../Security/auth');

router.delete('/delete', validateJWT, async (req, res) => {
    try {
        if (req.body.id_uti) {
            if(req.body.id_poste){
                await utilisateurPosteRepository.deleteUtiPoste(req.body.id_uti, req.body.id_poste)
                res.status(200).send({ success: "Qualification de l'utilisateur supprimé avec succés" });
            } else {
                res.status(400).send({ erreur: "L'id du poste est invalide" });
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


