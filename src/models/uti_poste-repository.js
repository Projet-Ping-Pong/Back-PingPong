const { Op } = require('sequelize');
const Qualification = require('../models/uti_poste.model.js');

exports.createQualification = async (body) => {
    await Qualification.create(body);
};