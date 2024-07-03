const express = require('express');
const router = express.Router();
const utilisateurRepository = require('../models/Admin/Utilisateur/utilisateur-repository');
const utilisateurDroitRepository = require('../models/Admin/Utilisateur/utilisateur_droit-repository');
const droitRepository = require('../models/Admin/Droit/droit-repository');
const { passwordsAreEqual } = require('../Security/crypt');
const { generateAuthToken } = require('../Security/auth');

router.post('/', async (req, res) => {

    const utilisateur = await utilisateurRepository.getUserByNomUti(req.body.nom_uti);
    var droit_utilisateur = {}
    if (!utilisateur || !(utilisateur && passwordsAreEqual(req.body.mdp, utilisateur.mdp))) {
        res.status(401).send({erreur: "Nom d'utilisateur ou mot de passe incorrect"});
        return;
    }
    
    droit_utilisateur = await utilisateurDroitRepository.getUtiDroitByIdUti(utilisateur.id);
    var tabDroits = []
    for (let i = 0; i < droit_utilisateur.length; i++) {
        const droit = await droitRepository.getDroitById(droit_utilisateur[i].id_droit)
        tabDroits = [...tabDroits,droit]
    }
    
    const token = generateAuthToken(utilisateur.id, utilisateur.nom_uti, tabDroits);
    //const token = jwt.generateJWT(utilisateur.nom_uti);

    res.status(200).json({ token });
});

exports.initializeRoutes = () => router;