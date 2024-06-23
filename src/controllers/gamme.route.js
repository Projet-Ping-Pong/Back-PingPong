const express = require('express');
const router = express.Router();
const gammeRepository = require('../models/gamme-repository');
const pieceRepository = require('../models/piece-repository');
const gammeoperationRepository = require('../models/gamme_operation-repository');
const { validateJWT } = require('../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    res.status(200).send(await gammeRepository.getAllGamme());
});

router.post('/getId', validateJWT, async (req, res) => {
    if (req.body.id !== "" || req.body.id !== null) {
        res.status(200).send(await gammeRepository.getGammeById(req.body.id));
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    res.status(200).send(await gammeRepository.getGammeByLibelle(req.body.libelle));
});

router.post('/add', validateJWT, async (req, res) => {
    const gamme = await gammeRepository.createGamme(req.body)

    if (req.body.id_piece != null && req.body.id_piece != undefined) {
        await pieceRepository.updatePieceIdGamme(req.body.id_piece, gamme.id)
    }

    await req.body.operationList.forEach(element => {
        gammeoperationRepository.createGammeOperation({
            id_gamme: gamme.id,
            id_operation: element.id
        })
    });
    res.status(200).send(gamme);
});

router.put('/update/:id', validateJWT, async (req, res) => {
    if (req.params.id !== "" || req.params.id !== null) {
        for (let i = 0; i < req.body.operationList.length; i++) {
            if (await gammeoperationRepository.getGammeOperationByIdGammeAndIdOperation(req.params.id, req.body.operationList[i].id) === null) {
                gammeoperationRepository.createGammeOperation({
                    id_gamme: req.params.id,
                    id_operation: req.body.operationList[i].id
                })
            }
        }
        res.status(200).send(await gammeRepository.updateGamme(req.params.id, req.body));
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    await gammeRepository.deleteGamme(req.params.id)
    res.status(200).send({success: "Supprimé"});
});

exports.initializeRoutes = () => router;