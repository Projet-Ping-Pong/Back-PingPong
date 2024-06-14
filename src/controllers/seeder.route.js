const express = require('express');
const router = express.Router();
const utiRepository = require('../models/utilisateur-repository');
const droitRepository = require('../models/droit-repository');
const utilisateur_droitRepository = require('../models/utilisateur_droit-repository');
const pieceRepository = require('../models/piece-repository');

// Création d'un utilisateur
router.get('/', async (req, res) => {
    await utiRepository.createUti({
        nom: 'Admin',
        prenom: 'Admin',
        mdp: 'Admin',
        nom_uti: 'Admin',
    });

    await utiRepository.createUti({
        nom: 'Atelier',
        prenom: 'Atelier',
        mdp: 'Atelier',
        nom_uti: 'Atelier',
    });

    await utiRepository.createUti({
        nom: 'Commerce',
        prenom: 'Commerce',
        mdp: 'Commerce',
        nom_uti: 'Commerce',
    });

    await droitRepository.createDroit({
        libelle: 'Admin',
        niveau: 1,
    });

    await droitRepository.createDroit({
        libelle: 'Atelier',
        niveau: 1,
    });

    await droitRepository.createDroit({
        libelle: 'Commerce',
        niveau: 1,
    });

    await utilisateur_droitRepository.createUtiDroit({
        id_uti: 1,
        id_droit: 1,
    });

    await utilisateur_droitRepository.createUtiDroit({
        id_uti: 2,
        id_droit: 2,
    });

    await utilisateur_droitRepository.createUtiDroit({
        id_uti: 3,
        id_droit: 3,
    });

    await pieceRepository.createPiece({
        libelle: "Pièce 1",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 30,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Article 1",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    await pieceRepository.createPiece({
        libelle: "Article 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: "Test",
        g_libelle: "Test",
        g_desc: "Test",
    });
    res.status(200).send("Créations avec le seeder");
});

exports.initializeRoutes = () => router;