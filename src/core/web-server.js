const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const {sequelize} = require("../models/db");
const seederRoutes = require('../controllers/seeder.route');
const connexionRoutes = require('../controllers/co.route')
const pieceRoutes = require('../controllers/piece.route')
const machineRoutes = require('../controllers/machine.route')
const posteRoutes = require('../controllers/poste.route')
const postemachineRoutes = require('../controllers/poste_machine.route')
const operationRoutes = require('../controllers/operation.route')
const gammeRoutes = require('../controllers/gamme.route')
const gammeoperationRoutes = require('../controllers/gamme_operation.route')
const piececompoRoutes = require('../controllers/piece_compo.route')
const realisationRoutes = require('../controllers/realisation.route')
const utilisateurRoutes = require('../controllers/utilisateur.route')

const Utilisateur = require("../models/utilisateur.model");
const Droit = require("../models/droit.model");
const Piece = require("../models/piece.model");
const Machine = require("../models/machine.model");
const Poste = require("../models/poste.model");
const Operation = require("../models/operation.model");
const Piece_Compo = require("../models/piece_compo.model");
const Gammes_Operations = require("../models/gamme_operation.model")
const Gamme = require("../models/gamme.model")
const Realisation = require("../models/realisation.model")
const Qualification = require("../models/uti_poste.model")

const clientRoutes = require('../controllers/Commerce/Client/client.route')
const fournisseurRoutes = require('../controllers/Commerce/Fournisseur/fournisseur.route')
const devisRoutes = require('../controllers/Commerce/Devis/devis.route')
const lignedevisRoutes = require('../controllers/Commerce/Devis/ligne_devis.route')

const Client = require("../models/Commerce/Client/client.model")
const Commande_Vente = require("../models/Commerce/CommandeVente/commande_vente.model")
const Ligne_Vente = require("../models/Commerce/LigneCmdVente/ligne_vente.model")
const Devis = require("../models/Commerce/Devis/devis.model")
const Fournisseur = require("../models/Commerce/Fournisseur/fournisseur.model")
const Commande_Achat = require("../models/Commerce/CommandeAchat/commande_achat.model")
const Ligne_Achat = require("../models/Commerce/LigneCmdAchat/ligne_achat.model")

class WebServer {
    app = undefined;
    port = process.env.PORT;
    server = undefined;

    constructor() {
        this.app = express();
        Utilisateur.belongsToMany(Droit, { as: 'children', foreignKey: 'id_uti', through: 'Utilisateurs_Droits' });
        Droit.belongsToMany(Utilisateur, { as: 'parents', foreignKey: 'id_droit', through: 'Utilisateurs_Droits' });
        Piece.belongsToMany(Piece, { as: 'children', foreignKey: 'id_piece_composant', through: Piece_Compo });
        Piece.belongsToMany(Piece, { as: 'parents', foreignKey: 'id_piece_compose', through: Piece_Compo });
        Poste.hasMany(Operation, {foreignKey: 'id_poste'});
        Operation.belongsTo(Poste, {foreignKey: 'id_poste'});
        Machine.hasMany(Operation, {foreignKey: 'id_machine'});
        Operation.belongsTo(Machine, {foreignKey: 'id_machine'});
        Gamme.belongsToMany(Operation, { as: 'children2', foreignKey: 'id_gamme', through: Gammes_Operations });
        Operation.belongsToMany(Gamme, { as: 'parents2', foreignKey: 'id_operation', through: Gammes_Operations });
        Poste.belongsToMany(Machine, { as: 'children3', foreignKey: 'id_poste', through: 'Postes_Machines' });
        Machine.belongsToMany(Poste, { as: 'parents3', foreignKey: 'id_machine', through: 'Postes_Machines' });
        Poste.hasMany(Operation, {foreignKey: 'id_poste'});
        Operation.belongsTo(Poste, {foreignKey: 'id_poste'});

        Piece.hasMany(Realisation, {foreignKey: 'id_piece'});
        Realisation.belongsTo(Piece, {foreignKey: 'id_piece'});
        Poste.hasMany(Realisation, {foreignKey: 'id_poste'});
        Realisation.belongsTo(Poste, {foreignKey: 'id_poste'});
        Machine.hasMany(Realisation, {foreignKey: 'id_machine'});
        Realisation.belongsTo(Machine, {foreignKey: 'id_machine'});
        Utilisateur.hasMany(Realisation, {foreignKey: 'id_uti'});
        Realisation.belongsTo(Utilisateur, {foreignKey: 'id_uti'});

        Utilisateur.belongsToMany(Poste, { as: 'children4', foreignKey: 'id_uti', through: Qualification });
        Poste.belongsToMany(Utilisateur, { as: 'parents4', foreignKey: 'id_poste', through: Qualification });

        Piece.hasMany(Ligne_Vente, {foreignKey: 'id_piece'})
        Ligne_Vente.belongsTo(Piece, {foreignKey: 'id_piece'});
        Devis.hasMany(Ligne_Vente, {foreignKey: 'id_devis'})
        Ligne_Vente.belongsTo(Devis, {foreignKey: 'id_devis'});
        Commande_Vente.hasMany(Ligne_Vente, {foreignKey: 'id_commande'})
        Ligne_Vente.belongsTo(Commande_Vente, {foreignKey: 'id_commande'});
        Client.hasMany(Devis, {foreignKey: 'id_client'})
        Devis.belongsTo(Client, {foreignKey: 'id_client'});
        Client.hasMany(Commande_Vente, {foreignKey: 'id_client'})
        Commande_Vente.belongsTo(Client, {foreignKey: 'id_client'});

        Piece.hasMany(Ligne_Achat, {foreignKey: 'id_piece'})
        Ligne_Achat.belongsTo(Piece, {foreignKey: 'id_piece'});
        Commande_Achat.hasMany(Ligne_Achat, {foreignKey: 'id_commande'})
        Ligne_Achat.belongsTo(Commande_Achat, {foreignKey: 'id_commande'});
        Fournisseur.hasMany(Commande_Achat, {foreignKey: 'id_fournisseur'})
        Commande_Achat.belongsTo(Fournisseur, {foreignKey: 'id_fournisseur'});

        // sequelize.sync({force:true})
        sequelize.sync()
        initializeConfigMiddlewares(this.app);
        this._initializeRoutes();
        initializeErrorMiddlwares(this.app);
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
        });
    }

    stop() {
        this.server.close();
    }

    _initializeRoutes() {
        this.app.use('/seeder', seederRoutes.initializeRoutes());
        this.app.use('/login', connexionRoutes.initializeRoutes());
        this.app.use('/utilisateur', utilisateurRoutes.initializeRoutes());
        this.app.use('/piece', pieceRoutes.initializeRoutes());
        this.app.use('/piececompo', piececompoRoutes.initializeRoutes());
        this.app.use('/machine', machineRoutes.initializeRoutes());
        this.app.use('/poste', posteRoutes.initializeRoutes());
        this.app.use('/postemachine', postemachineRoutes.initializeRoutes());
        this.app.use('/operation', operationRoutes.initializeRoutes());
        this.app.use('/gamme', gammeRoutes.initializeRoutes());
        this.app.use('/gammeoperation', gammeoperationRoutes.initializeRoutes());
        this.app.use('/realisation', realisationRoutes.initializeRoutes());

        this.app.use('/client', clientRoutes.initializeRoutes());
        this.app.use('/fournisseur', fournisseurRoutes.initializeRoutes());
        this.app.use('/devis', devisRoutes.initializeRoutes());
        this.app.use('/lignedevis', lignedevisRoutes.initializeRoutes());
    }
}

module.exports = WebServer;