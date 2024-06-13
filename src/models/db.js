const Sequelize = require('sequelize');
require('dotenv').config();

exports.sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_MDP}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)