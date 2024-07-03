const express = require('express');
const piececompoRepository = require('../../../models/Atelier/Piece/piece_compo-repository');
const router = express.Router();
const { validateJWT } = require('../../../Security/auth');

router.delete('/delete', validateJWT, async (req, res) => {
    try {
        if (req.params.id_piece_composant) {
            await piececompoRepository.deletePieceCompo(req.body.id_piece_composant, req.body.id_piece_compose)
            res.status(200).send({ success: "Supprimé" });
        } else {
            res.status(400).send({ erreur: "L'id du composant est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getCompoByIdPiece', async (req, res) => {
    try {
        if (req.body.id_piece_composant) {
            res.status(200).send(piececompoRepository.getAllPieceCompoByIdPiece(req.body.id_piece_composant));
        } else {
            res.status(400).send({ erreur: "L'id du composant est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;