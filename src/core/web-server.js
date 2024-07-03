const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const {sequelize} = require("../models/db");
const seederRoutes = require('../controllers/seeder.route');
const connexionRoutes = require('../controllers/co.route')

// Atelier

const pieceRoutes = require('../controllers/Atelier/Piece/piece.route')
const machineRoutes = require('../controllers/Atelier/Machine/machine.route')
const posteRoutes = require('../controllers/Atelier/Poste/poste.route')
const postemachineRoutes = require('../controllers/Atelier/Poste/poste_machine.route')
const operationRoutes = require('../controllers/Atelier/Operation/operation.route')
const gammeRoutes = require('../controllers/Atelier/Gamme/gamme.route')
const gammeoperationRoutes = require('../controllers/Atelier/Gamme/gamme_operation.route')
const piececompoRoutes = require('../controllers/Atelier/Piece/piece_compo.route')
const realisationRoutes = require('../controllers/Atelier/Realisation/realisation.route')


const Piece = require("../models/Atelier/Piece/piece.model");
const Machine = require("../models/Atelier/Machine/machine.model");
const Poste = require("../models/Atelier/Poste/poste.model");
const Operation = require("../models/Atelier/Operation/operation.model");
const Piece_Compo = require("../models/Atelier/Piece/piece_compo.model");
const Gammes_Operations = require("../models/Atelier/Gamme/gamme_operation.model")
const Gamme = require("../models/Atelier/Gamme/gamme.model")
const Realisation = require("../models/Atelier/Realisation/realisation.model")
const Qualification = require("../models/Admin/Qualification/uti_poste.model")


// Commerce

const clientRoutes = require('../controllers/Commerce/Client/client.route')
const fournisseurRoutes = require('../controllers/Commerce/Fournisseur/fournisseur.route')
const devisRoutes = require('../controllers/Commerce/Devis/devis.route')
const lignedevisRoutes = require('../controllers/Commerce/Devis/ligne_devis.route')
const commandeVenteRoutes = require('../controllers/Commerce/CommandeVente/commande_vente_route')
const ligneventeRoutes = require('../controllers/Commerce/CommandeVente/ligne_vente.route')
const commandeAchatRoutes = require('../controllers/Commerce/CommandeAchat/commande_achat.route')
const ligneachatRoutes = require('../controllers/Commerce/CommandeAchat/ligne_achat.route')

const Client = require("../models/Commerce/Client/client.model")
const Commande_Vente = require("../models/Commerce/CommandeVente/commande_vente.model")
const Ligne_Vente = require("../models/Commerce/LigneCmdVente/ligne_vente.model")
const Devis = require("../models/Commerce/Devis/devis.model")
const Fournisseur = require("../models/Commerce/Fournisseur/fournisseur.model")
const Commande_Achat = require("../models/Commerce/CommandeAchat/commande_achat.model")
const Ligne_Achat = require("../models/Commerce/LigneCmdAchat/ligne_achat.model")

// Admin

const utilisateurRoutes = require('../controllers/Admin/Utilisateur/utilisateur.route')
const droitRoutes = require('../controllers/Admin/Droit/droit.route')
const utilisateurdroitRoutes = require("../controllers/Admin/Utilisateur/utilisateur_droit.route")
const utilisateurposteRoutes = require("../controllers/Admin/Utilisateur/utilisateur_poste.route")

const Utilisateur = require("../models/Admin/Utilisateur/utilisateur.model");
const Droit = require("../models/Admin/Droit/droit.model");



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
        Fournisseur.hasMany(Ligne_Achat, {foreignKey: 'id_fournisseur'})
        Ligne_Achat.belongsTo(Fournisseur, {foreignKey: 'id_fournisseur'});

        Fournisseur.hasMany(Piece, {foreignKey: 'id_fournisseur'})
        Piece.belongsTo(Fournisseur, {foreignKey: 'id_fournisseur'});

        // sequelize.sync({force:true})
        // sequelize.sync({alter: true})
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
        this.app.use('/commandevente', commandeVenteRoutes.initializeRoutes());
        this.app.use('/lignevente', ligneventeRoutes.initializeRoutes());
        this.app.use('/commandeachat', commandeAchatRoutes.initializeRoutes());
        this.app.use('/ligneachat', ligneachatRoutes.initializeRoutes());

        this.app.use('/utilisateur', utilisateurRoutes.initializeRoutes());
        this.app.use('/droit', droitRoutes.initializeRoutes());
        this.app.use('/utilisateurdroit', utilisateurdroitRoutes.initializeRoutes());
        this.app.use('/utilisateurposte', utilisateurposteRoutes.initializeRoutes());
    }
}

module.exports = WebServer;