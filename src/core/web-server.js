const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const seederRoutes = require('../controllers/seeder.route');
const connexionRoutes = require('../controllers/co.route')
const pieceRoutes = require('../controllers/piece.route')
const machineRoutes = require('../controllers/machine.route')
const posteRoutes = require('../controllers/poste.route')
const operationRoutes = require('../controllers/operation.route')

const {sequelize} = require("../models/db");
const Utilisateur = require("../models/utilisateur.model");
const Droit = require("../models/droit.model");
const Utilisateurs_Droits = require("../models/utilisateur_droit.model");
const Piece = require("../models/piece.model");
const Machine = require("../models/machine.model");
const Poste = require("../models/poste.model");
const Operation = require("../models/operation.model");
const Piece_Compo = require("../models/piece_compo.model");

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
        Piece.belongsToMany(Operation, { as: 'children2', foreignKey: 'id_piece', through: 'Gammes' });
        Operation.belongsToMany(Piece, { as: 'parents2', foreignKey: 'id_operation', through: 'Gammes' });
        sequelize.sync({force:true})
        // sequelize.sync()
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
        this.app.use('/machine', machineRoutes.initializeRoutes());
        this.app.use('/poste', posteRoutes.initializeRoutes());
        this.app.use('/operation', operationRoutes.initializeRoutes());
    }
}

module.exports = WebServer;