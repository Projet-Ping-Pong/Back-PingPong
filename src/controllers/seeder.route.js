const express = require('express');
const router = express.Router();
const utiRepository = require('../models/utilisateur-repository');
const droitRepository = require('../models/droit-repository');
const utilisateur_droitRepository = require('../models/utilisateur_droit-repository');
const pieceRepository = require('../models/piece-repository');
const gammeRepository = require('../models/gamme-repository');
const operationRepository = require('../models/operation-repository');
const posteRepository = require('../models/poste-repository');
const machineRepository = require('../models/machine-repository');
const qualificationRepository = require('../models/uti_poste-repository');

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
        nom: 'RespAtelier2',
        prenom: 'RespAtelier2',
        mdp: 'RespAtelier2',
        nom_uti: 'RespAtelier2',
    });

    await utiRepository.createUti({
        nom: 'RespAtelier',
        prenom: 'RespAtelier',
        mdp: 'RespAtelier',
        nom_uti: 'RespAtelier',
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
        libelle: 'Atelier',
        niveau: 2,
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

    await utilisateur_droitRepository.createUtiDroit({
        id_uti: 4,
        id_droit: 3,
    });

    await utilisateur_droitRepository.createUtiDroit({
        id_uti: 5,
        id_droit: 4,
    });

    await pieceRepository.createPiece({
        libelle: "Pièce 1",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 30,
        unite: "KG",
        type: 1,
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 2",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 50,
        unite: "KG",
        type: 2,
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 3",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 70,
        unite: "U",
        type: 3,
    });
    await pieceRepository.createPiece({
        libelle: "Pièce 4",
        prix_vente: 10,
        prix_catalogue: 20,
        stock: 10,
        unite: "U",
        type: 4,
    });

    await machineRepository.createMachine({
        libelle: "Machine 1",
        description: "" 
    })

    await machineRepository.createMachine({
        libelle: "Machine 2",
        description: "" 
    })

    await machineRepository.createMachine({
        libelle: "Machine 3",
        description: "" 
    })

    await posteRepository.createPoste({
        libelle: "Poste 1",
        description: "" ,
        posteMachine: [{id:1}, {id:2}]
    })

    await posteRepository.createPoste({
        libelle: "Poste 2",
        description: "" 
    })

    await posteRepository.createPoste({
        libelle: "Poste 3",
        description: "" 
    })

    await qualificationRepository.createQualification({
        id_uti: 2,
        id_poste : 1,
    })

    await qualificationRepository.createQualification({
        id_uti: 2,
        id_poste : 2,
    })

    await qualificationRepository.createQualification({
        id_uti: 2,
        id_poste : 3,
    })

    await operationRepository.createOperation({
        libelle: "Opération 1",
        description: "",
        temps: "5 min",
        id_poste: 1,
        id_machine: 1,
    })

    await operationRepository.createOperation({
        libelle: "Opération 2",
        description: "",
        temps: "5 min",
    })

    await operationRepository.createOperation({
        libelle: "Opération 3",
        description: "",
        temps: "5 min",
    })
    res.status(200).send("Créations avec le seeder");
});

exports.initializeRoutes = () => router;