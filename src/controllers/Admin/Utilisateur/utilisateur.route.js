const express = require('express');
const router = express.Router();
const utiRepository = require('../../../models/Admin/Utilisateur/utilisateur-repository');
const droitRepository = require('../../../models/Admin/Droit/droit-repository');
const posteRepository = require('../../../models/Atelier/Poste/poste-repository');
const utilisateurDroitRepository = require('../../../models/Admin/Utilisateur/utilisateur_droit-repository');
const qualificationRepository = require('../../../models/Admin/Qualification/uti_poste-repository');

const { validateJWT } = require('../../../Security/auth');


router.post('/add', validateJWT, async (req, res) => {
    try {
        const utilisateur = await utiRepository.createUti(req.body.utilisateur)
        for (let i = 0; i < req.body.droits.length; i++) {
            console.log(req.body.droits[i]);
            await utilisateurDroitRepository.createUtiDroit({
                id_uti: utilisateur.id,
                id_droit: req.body.droits[i].id,
            })
        }
        for (let i = 0; i < req.body.qualifications.length; i++) {
            await qualificationRepository.createQualification({
                id_uti: utilisateur.id,
                id_poste : req.body.qualifications[i].id,
            })
        }
        res.status(200).send(utilisateur);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await utiRepository.getAllUtilisateur());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            const utilisateur = await utiRepository.getUtiById(req.body.id)
            const droits = await utilisateurDroitRepository.getUtiDroitByIdUti(req.body.id)
            const qualifications = await qualificationRepository.getUtiPosteByIdUti(req.body.id)
            
            let listeDroits = []
            for (let i = 0; i < droits.length; i++) {
                const droit = await droitRepository.getDroitById(droits[i].id_droit)
                listeDroits.push(droit)
            }

            let listePostes = []
            for (let i = 0; i < qualifications.length; i++) {
                const poste = await posteRepository.getPosteById(qualifications[i].id_poste)
                listePostes.push(poste)
            }

            const object = {
                utilisateur: utilisateur,
                droits: listeDroits,
                qualifications: listePostes
            }

            res.status(200).send(object);
        } else {
            res.status(400).send({ erreur: "L'id de l'utilisateur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechNomUti', async (req, res) => {
    try {
        if (req.body.nom_uti) {
            res.status(200).send(await utiRepository.getUtiByNomUti(req.body.nom_uti));
        } else {
            res.status(400).send({ erreur: "Le nom d'utilisateur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {

            for (let i = 0; i < req.body.droits.length; i++) {
                const droitExist = await utilisateurDroitRepository.getUtiDroitByIdUtiAndDroit(req.params.id, req.body.droits[i].id)
                if (!droitExist) {
                    await utilisateurDroitRepository.createUtiDroit({
                        id_uti: req.params.id,
                        id_droit: req.body.droits[i].id
                    })
                }
            }

            for (let i = 0; i < req.body.qualifications.length; i++) {
                const qualExist = await qualificationRepository.getUtiPosteByIdUtiAndPoste(req.params.id, req.body.qualifications[i].id)
                console.log(qualExist);
                if (!qualExist) {
                    await qualificationRepository.createQualification({
                        id_uti: req.params.id,
                        id_poste: req.body.qualifications[i].id
                    })
                }
            }

            const utilisateur = await utiRepository.updateUtilisateur(req.params.id, req.body.utilisateur)
            res.status(200).send(utilisateur)
        } else {
            res.status(400).send({ erreur: "L'id de l'utilisateur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await utiRepository.deleteUtilisateur(req.params.id)
            res.status(200).send({ success: "Utilisateur supprimé avec succés" });
        } else {
            res.status(400).send({ erreur: "L'id de l'utilisateur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;


