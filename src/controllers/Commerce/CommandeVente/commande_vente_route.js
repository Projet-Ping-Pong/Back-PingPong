const express = require('express');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');
const commandeVenteRepository = require('../../../models/Commerce/CommandeVente/commande_vente-repository');
const ligneVenteRepository = require('../../../models/Commerce/LigneCmdVente/ligne_vente-repository');
const clientRepository = require('../../../models/Commerce/Client/client-repository');

router.post('/add', validateJWT, async (req, res) => {
    try {
        commandeVente = await commandeVenteRepository.createCommandeVente(req.body.commandeVente)
        if (commandeVente.id && req.body.listePiece) {
            for (let i = 0; i < req.body.listePiece.length; i++) {
                await ligneVenteRepository.updateLigneVenteIdCommande(req.body.listePiece[i].id, commandeVente.id)
            }
        } else {
            res.status(400).send({ erreur: "L'id de la commande est invalide ou la commande est inexistant" });
        }
        res.status(200).send(commandeVente);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        commandeVente = await commandeVenteRepository.getAllCommandeVente()
        commandeVenteClient = []
        for (let i = 0; i < commandeVente.length; i++) {
            client = await clientRepository.getClientById(commandeVente[i].id_client)
            commandeVenteClient.push({
                id: commandeVente[i].id,
                libelle: commandeVente[i].libelle,
                delai: commandeVente[i].delai,
                date: commandeVente[i].date,
                id_client: commandeVente[i].id_client,
                client: client.raison_sociale
            })
        }
        res.status(200).send(commandeVenteClient);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            commande = await commandeVenteRepository.getCommandeVenteById(req.body.id)
            client = await clientRepository.getClientById(commande.id_client)
            commande = {
                id: commande.id,
                libelle: commande.libelle,
                delai: commande.delai,
                date: commande.date,
                id_client: commande.id_client,
                client: client.raison_sociale,
                clientAll: client
            }
            let listePiece = await ligneVenteRepository.getAllLigneVenteByIdCommande(commande.id)
            let listePieceWithoutCommande = await ligneVenteRepository.getAllLigneVenteByIdClientWithoutCommande(commande.id_client)
            let commandeWithLigne = {
                commande: commande,
                listePiece: listePiece,
                listePieceWithoutCommande : listePieceWithoutCommande
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

router.get('/generecsv/:mois', async (req, res) => {
    try {
        const commandes = await commandeVenteRepository.getCommandesByMois(req.params.mois);
        let csv = "id;libelle;date;client;"
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
        if (req.body.id && req.body.listePiece) {
            for (let i = 0; i < req.body.listePiece.length; i++) {
                await ligneVenteRepository.updateLigneVenteIdCommande(req.body.listePiece[i].id, req.body.id)
            }
        } else {
            res.status(400).send({ erreur: "L'id de la commande est invalide ou la commande est inexistant" });
        }
        res.status(200).send(req.body);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;