const express = require('express');
const { QueryTypes, Query } = require('sequelize');
const piececompoRepository = require('../models/piece_compo-repository');
const router = express.Router();
const { sequelize } = require('../models/db');
const { validateJWT } = require('../Security/auth');

router.delete('/delete', validateJWT, async (req, res) => {
    if (req.params.id_piece_composant !== "" || req.params.id_piece_composant !== null) {
        await piececompoRepository.deletePieceCompo(req.body.id_piece_composant, req.body.id_piece_compose)
        res.status(200).send({ success: "Supprimé" });
    }
});

router.post('/getCompoByIdPiece', async (req, res) => {
    if (req.body.id_piece_composant !== "" || req.body.id_piece_composant !== null) {
        const pieces = await sequelize.query(`
            SELECT "Pieces".*, "Pieces_Compos".quantite
	        FROM "Pieces" LEFT JOIN "Pieces_Compos" ON "Pieces".id = "Pieces_Compos".id_piece_compose
	        WHERE "Pieces_Compos".id_piece_composant = :id_piece `, {
            replacements: { id_piece: req.body.id_piece_composant },
            type: QueryTypes.SELECT,
        });

        res.status(200).send(pieces);
    }
});

exports.initializeRoutes = () => router;