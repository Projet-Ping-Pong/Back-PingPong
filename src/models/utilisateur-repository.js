const { Op } = require('sequelize');
const Utilisateur = require('../models/utilisateur.model.js');
const bcrypt = require('bcryptjs');

// Get a user by id
exports.getUtiById = async (id) => {
    const utiFound = await Utilisateur.findOne({
        where: {
            id: id,
        }
    });

    return utiFound;
};

exports.getUtiByNomUti = async (nom_uti) => {
    const utiFound = await Utilisateur.findAll({
        where: {
            nom_uti: {
              [Op.iLike]: `%${nom_uti}%`,
            },
          },
    });

    return utiFound;
};

exports.getUserByNomUti = async (nom_uti) => {
    const utiFound = await Utilisateur.findOne({
        where: {
            nom_uti: nom_uti,
        }
    });

    return utiFound;
};

// // Get a user by his email (No need to include reviews and list because it's used only for login)
// exports.getUserByEmail = async (searchEmail) => {
//     const userFound = await Utilisateur.findOne({
//         where: {
//             email: searchEmail,
//         },
//         include: Role,
//     });

//     return userFound;
// };

// Create a user
exports.createUti = async (body) => {

    const hashedPassword = bcrypt.hashSync(body.mdp, bcrypt.genSaltSync(10));
    const utilisateur = body; 
    utilisateur.mdp = hashedPassword;

    await Utilisateur.create(utilisateur);

};

// // Update a user
// exports.updateUser = async (id, data) => {
//     const foundUser = await User.findOne({
//         where: {
//             id,
//         },
//     });

//     if (!foundUser) {
//         throw new Error('User not found');
//     } else {
//         return await User.update(
//             {
//                 userName: data.userName || foundUser.userName,
//                 email: data.email || foundUser.email,
//                 password: data.password ? bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)) : foundUser.password,
//                 profilePicture: data.profilePicture || foundUser.profilePicture
//             },
//             {
//                 where: {
//                     id,
//                 },
//             },
//         );
//     }
// };