const { sign, verify } = require('jsonwebtoken');
const utiRepository = require('../models/utilisateur-repository');

exports.generateAuthToken = (id_user, name_user, droits) => {

    var jwt_secret = process.env.JWT_SECRET
    var jwt_expires_in = process.env.JWT_EXPIRES_IN
    if (jwt_secret === undefined || jwt_expires_in === undefined) {
        const { env } = process;
        const read_base64_json = function (varName) {
            try {
                return JSON.parse(Buffer.from(env[varName], "base64").toString())
            } catch (err) {
                throw new Error(`no ${varName} environment variable`)
            }
        };
        const variables = read_base64_json('PLATFORM_VARIABLES')
        jwt_secret = variables["JWT_SECRET"]
        jwt_expires_in = variables["JWT_EXPIRES_IN"]
    }

    return sign({ id_user, name_user, droits }, jwt_secret, { expiresIn: jwt_expires_in });
};

exports.validateJWT = (req, res, next) => {
    if (req.headers.authorization === undefined) {
        res.status(401).end()
        return
    }

    var jwt_secret = process.env.JWT_SECRET
    var jwt_expires_in = process.env.JWT_EXPIRES_IN
    if (jwt_secret === undefined || jwt_expires_in === undefined) {
        const { env } = process;
        const read_base64_json = function (varName) {
            try {
                return JSON.parse(Buffer.from(env[varName], "base64").toString())
            } catch (err) {
                throw new Error(`no ${varName} environment variable`)
            }
        };
        const variables = read_base64_json('PLATFORM_VARIABLES')
        jwt_secret = variables["JWT_SECRET"]
        jwt_expires_in = variables["JWT_EXPIRES_IN"]
    }

    const token = req.headers.authorization.split(" ")[1];
    verify(token, jwt_secret, { algorithm: "HS256" }, async (err, user) => {
        if (err) {
            res.status(401).end()
            return
        }
        try {
            req.user = await utiRepository.getUserByNomUti(user.name_user)
            return next()
        } catch (e) {
            console.log(e)
            res.status(401).end()
        }
    })
}