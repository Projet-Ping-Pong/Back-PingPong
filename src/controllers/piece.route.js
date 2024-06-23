const express = require('express');
const router = express.Router();
const pieceRepository = require('../models/piece-repository');
const gammeRepository = require('../models/gamme-repository');
const piececompoRepository = require('../models/piece_compo-repository')
const { validateJWT } = require('../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await pieceRepository.getAllPiece());
});

router.post('/getId', validateJWT, async (req, res) => {
    if (req.body.id !== "" || req.body.id !== null) {
        res.status(200).send(await pieceRepository.getPieceById(req.body.id));
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    console.log(req.body);
    res.status(200).send(await pieceRepository.getPieceByLibelle(req.body.libelle));
});

router.post('/add', validateJWT, async (req, res) => {
    const piece = await pieceRepository.createPiece(req.body)
    if (req.body.id_gamme != null && req.body.id_gamme != undefined) {
        await gammeRepository.updateGammeIdPiece(req.body.id_gamme, piece.id)
    }
    if (req.body.listCompo != []) {
        req.body.listCompo.forEach(element => {
            const compo = {
                id_piece_composant: piece.id,
                id_piece_compose: element.id,
                quantite: element.quantite
            }
            piececompoRepository.createPieceCompo(compo)
        })
    }
    res.status(200).send(piece);
});

router.put('/update/:id', validateJWT, async (req, res) => {
    if (req.body.id_gamme != null && req.body.id_gamme != undefined) {
        await gammeRepository.updateGammeIdPiece(req.body.id_gamme, req.params.id)
    }
    if (req.body.listCompo != []) {
        for (let i = 0; i < req.body.listCompo.length; i++) {
            const compo = {
                id_piece_composant: req.params.id,
                id_piece_compose: req.body.listCompo[i].id,
                quantite: req.body.listCompo[i].quantite
            }
            if (await piececompoRepository.getPieceCompoByIdPieceAndCompo(parseInt(compo.id_piece_composant), parseInt(compo.id_piece_compose))) {
                await piececompoRepository.updatePieceCompo(compo, compo.id_piece_composant, compo.id_piece_compose)
            } else {
                await piececompoRepository.createPieceCompo(compo)
            }
        }
    }
    res.status(200).send(await pieceRepository.updatePiece(req.params.id, req.body));
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    await pieceRepository.deletePiece(req.params.id)
    res.status(200).send({ success: "Supprimé" });
});

exports.initializeRoutes = () => router;