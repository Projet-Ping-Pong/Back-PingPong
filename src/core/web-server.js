const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const seederRoutes = require('../controllers/seeder.route');
const connexionRoutes = require('../controllers/co.route')
const pieceRoutes = require('../controllers/piece.route')
const machineRoutes = require('../controllers/machine.route')

const {sequelize} = require("../models/db");
const Utilisateur = require("../models/utilisateur.model");
const Droit = require("../models/droit.model");
const Utilisateurs_Droits = require("../models/utilisateur_droit.model");

class WebServer {
    app = undefined;
    port = process.env.PORT;
    server = undefined;

    constructor() {
        this.app = express();
        Utilisateur.belongsToMany(Droit, { through: Utilisateurs_Droits });
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
        this.app.use('/piece', pieceRoutes.initializeRoutes());
        this.app.use('/machine', machineRoutes.initializeRoutes());
    }
}

module.exports = WebServer;