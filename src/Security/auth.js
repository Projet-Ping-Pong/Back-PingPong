const { sign } = require('jsonwebtoken');

exports.generateAuthToken = (id_user, name_user) => {
    return sign({ id_user, name_user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};