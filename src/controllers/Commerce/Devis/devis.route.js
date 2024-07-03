const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const devisRepository = require('../../../models/Commerce/Devis/devis-repository');
const ligneDevisRepository = require('../../../models/Commerce/LigneCmdVente/ligne_devis-repository');
const clientRepository = require('../../../models/Commerce/Client/client-repository');

router.post('/add', validateJWT, async (req, res) => {
    try {
        devis = await devisRepository.createDevis(req.body.devis)
        if (devis.id && req.body.listePiece) {
            for (let i = 0; i < req.body.listePiece.length; i++) {
                await ligneDevisRepository.createLigneDevis({
                    libelle: req.body.listePiece[i].libelle,
                    prix_vente: req.body.listePiece[i].prix_vente,
                    quantite: req.body.listePiece[i].quantite,
                    unite: req.body.listePiece[i].unite,
                    id_piece: req.body.listePiece[i].id_piece,
                    id_devis: devis.id,
                    id_commande: null,
                });
            }
        } else {
            res.status(400).send({ erreur: "L'id du devis est invalide ou le devis est inexistant" });
        }
        res.status(200).send(devis);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        devis = await devisRepository.getAllDevis()
        devisClient = []
        for (let i = 0; i < devis.length; i++) {
            client = await clientRepository.getClientById(devis[i].id_client)
            devisClient.push({
                id: devis[i].id,
                libelle: devis[i].libelle,
                delai: devis[i].delai,
                date: devis[i].date,
                id_client: devis[i].id_client,
                client: client.raison_sociale
            })
        }
        res.status(200).send(devisClient);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            devis = await devisRepository.getDevisById(req.body.id)
            client = await clientRepository.getClientById(devis.id_client)
            devis = {
                id: devis.id,
                libelle: devis.libelle,
                delai: devis.delai,
                date: devis.date,
                id_client: devis.id_client,
                client: client.raison_sociale
            }
            let listePiece = await ligneDevisRepository.getAllLigneDevisByIdDevis(devis.id)
            let devisWithLigne = {
                devis: devis,
                listePiece: listePiece,
            }
            res.status(200).send(devisWithLigne);
        } else {
            res.status(400).send({ erreur: "L'id du devis est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await devisRepository.getDevisByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé du devis est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            for (let i = 0; i < req.body.listePiece.length; i++) {
                const ligneExist = await ligneDevisRepository.getLigneDevisByIdDevisAndPiece(req.params.id,req.body.listePiece[i].id_piece)
                const ligneDevis = {
                    libelle: req.body.listePiece[i].libelle,
                    quantite: req.body.listePiece[i].quantite,
                    unite: req.body.listePiece[i].unite,
                    prix_vente: req.body.listePiece[i].prix_vente,
                    id_piece: req.body.listePiece[i].id_piece,
                    id_devis: req.params.id,
                    id_commande: null
                }
                if (ligneExist) {
                    await ligneDevisRepository.updateLigneDevis(ligneDevis, req.body.listePiece[i].id, req.body.listePiece[i])
                } else {
                    await ligneDevisRepository.createLigneDevis(ligneDevis)
                }
            }
            const devis = await devisRepository.updateDevis(req.params.id, req.body.devis);
            res.status(200).send(devis)
        } else {
            res.status(400).send({ erreur: "L'id du devis est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

// router.delete('/delete/:id', validateJWT, async (req, res) => {
//     try {
//         if (req.params.id) {
//             await devisRepository.deleteDevis(req.params.id)
//             res.status(200).send({ success: "Devis supprimé avec succés" });
//         } else {
//             res.status(400).send({ erreur: "L'id du devis est invalide" });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ erreur: error.message });
//     }

// });

exports.initializeRoutes = () => router;