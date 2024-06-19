const express = require('express');
const router = express.Router();
const utilisateurRepository = require('../models/utilisateur-repository');
const { passwordsAreEqual } = require('../Security/crypt');
const { generateAuthToken } = require('../Security/auth');

router.post('/', async (req, res) => {

    const utilisateur = await utilisateurRepository.getUserByNomUti(req.body.nom_uti);
    if (!utilisateur || !(utilisateur && passwordsAreEqual(req.body.mdp, utilisateur.mdp))) {
        res.status(401).send({erreur: "Nom d'utilisateur ou mot de passe incorrect"});
        return;
    }
    
    const token = generateAuthToken(utilisateur.id, utilisateur.nom_uti);
    //const token = jwt.generateJWT(utilisateur.nom_uti);

    res.status(200).json({ token });
});

exports.initializeRoutes = () => router;