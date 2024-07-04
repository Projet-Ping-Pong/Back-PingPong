const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const commandeAchatRepository = require('../../../models/Commerce/CommandeAchat/commande_achat-repository');
const ligneAchatRepository = require('../../../models/Commerce/LigneCmdAchat/ligne_achat-repository');
const fournisseurRepository = require('../../../models/Commerce/Fournisseur/fournisseur-repository');

router.post('/add', validateJWT, async (req, res) => {
    try {
        commande = await commandeAchatRepository.createCommandeAchat(req.body.commandeAchat)
        if (commande.id && req.body.listePiece) {
            for (let i = 0; i < req.body.listePiece.length; i++) {
                await ligneAchatRepository.createLigneAchat({
                    libelle: req.body.listePiece[i].libelle,
                    prix_achat: req.body.listePiece[i].prix_achat,
                    quantite: req.body.listePiece[i].quantite,
                    unite: req.body.listePiece[i].unite,
                    id_piece: req.body.listePiece[i].id_piece,
                    id_commande: commande.id,
                    id_fournisseur: req.body.commandeAchat.id_fournisseur
                });
            }
            res.status(200).send(commande);
        } else {
            res.status(400).send({ erreur: "L'id de la commande est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        commande = await commandeAchatRepository.getAllCommandeAchat()
        commandeFournisseur = []
        for (let i = 0; i < commande.length; i++) {
            fournisseur = await fournisseurRepository.getFournisseurById(commande[i].id_fournisseur)
            commandeFournisseur.push({
                id: commande[i].id,
                libelle: commande[i].libelle,
                date_liv_prevue: commande[i].date_liv_prevue,
                date_liv_reelle: commande[i].date_liv_reelle,
                date: commande[i].date,
                id_fournisseur: commande[i].id_fournisseur,
                fournisseur: fournisseur.raison_sociale
            })
        }
        res.status(200).send(commandeFournisseur);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            commande = await commandeAchatRepository.getCommandeAchatById(req.body.id)
            fournisseur = await fournisseurRepository.getFournisseurById(commande.id_fournisseur)
            commande = {
                id: commande.id,
                libelle: commande.libelle,
                date_liv_prevue: commande.date_liv_prevue,
                date_liv_reelle: commande.date_liv_reelle,
                date: commande.date,
                id_fournisseur: commande.id_fournisseur,
                fournisseur: fournisseur.raison_sociale,
                fournisseurAll: fournisseur
            }
            let listePiece = await ligneAchatRepository.getAllLigneAchatByIdCommande(commande.id)
            let commandeWithLigne = {
                commande: commande,
                listePiece: listePiece,
            }
            res.status(200).send(commandeWithLigne);
        } else {
            res.status(400).send({ erreur: "L'id de la commande est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await commandeAchatRepository.getCommandeAchatByLibelle(req.body.libelle));
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
                const ligneExist = await ligneAchatRepository.getLigneAchatByIdCommandeAndPiece(req.params.id,req.body.listePiece[i].id_piece)
                const ligneCommande = {
                    libelle: req.body.listePiece[i].libelle,
                    quantite: req.body.listePiece[i].quantite,
                    unite: req.body.listePiece[i].unite,
                    prix_achat: req.body.listePiece[i].prix_achat,
                    id_piece: req.body.listePiece[i].id_piece,
                    id_commande: req.params.id
                }
                if (ligneExist) {
                    await ligneAchatRepository.updateLigneAchat(ligneCommande, req.body.listePiece[i].id, req.body.listePiece[i])
                } else {
                    await ligneAchatRepository.createLigneAchat(ligneCommande)
                }
            }
            const commande = await commandeAchatRepository.updateCommandeAchat(req.params.id, req.body.commandeAchat);
            res.status(200).send(commande)
        } else {
            res.status(400).send({ erreur: "L'id de la commande est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/generecsv/:mois', async (req, res) => {
    try {
        const commandes = await commandeAchatRepository.getCommandesByMois(req.params.mois);
        let csv = "id;libelle;date;fournisseur;"
        commandes.forEach(element => {
            csv += `\n${element.id};${element.libelle};${element.date};${element.raison_sociale}`
        });
        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', 'attachment; filename="facture.csv"');
        res.status(200);
        res.send(csv);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;