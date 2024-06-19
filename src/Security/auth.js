const { sign, verify } = require('jsonwebtoken');
const utiRepository = require('../models/utilisateur-repository');

exports.generateAuthToken = (id_user, name_user) => {
    return sign({ id_user, name_user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

exports.validateJWT = (req, res, next) => {
    if (req.headers.authorization === undefined) {
        res.status(401).end()
        return
    }
    const token = req.headers.authorization.split(" ")[1];
    verify(token, process.env.JWT_SECRET, {algorithm: "HS256"},  async (err, user) => {
        if (err) {
            res.status(401).end()
            return
        }
        try {
            req.user = await utiRepository.getUserByNomUti(user.name_user)
            return next()
        } catch(e) {
            console.log(e)
            res.status(401).end()
        }
    })
}