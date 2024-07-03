const express = require('express');
const router = express.Router();
const gammeRepository = require('../../../models/Atelier/Gamme/gamme-repository')
const pieceRepository = require('../../../models/Atelier/Piece/piece-repository');
const gammeoperationRepository = require('../../../models/Atelier/Gamme/gamme_operation-repository');
const utilisateurRepository = require('../../../models/Admin/Utilisateur/utilisateur-repository')
const { validateJWT } = require('../../../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await gammeRepository.getAllGamme());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {

            const gamme = await gammeRepository.getGammeById(req.body.id)
            const operations = await gammeoperationRepository.getAllOpByIdGamme(gamme.id)
            let piece = null
            let utilisateur = null
            if(gamme.id_piece){
                piece = await pieceRepository.getPieceById(gamme.id_piece)
            }
            if(gamme.responsable){
                utilisateur = await utilisateurRepository.getUtiById(gamme.responsable)
            }
            
            object = {
                gamme: gamme,
                operations : operations,
                piece : piece,
                utilisateur: utilisateur
            }

            res.status(200).send(object);
        } else {
            res.status(400).send({ erreur: "L'id de la gamme est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }

});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await gammeRepository.getGammeByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé de la gamme est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }

});

router.post('/add', validateJWT, async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }

});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            for (let i = 0; i < req.body.operationList.length; i++) {
                if (await gammeoperationRepository.getGammeOperationByIdGammeAndIdOperation(req.params.id, req.body.operationList[i].id) === null) {
                    gammeoperationRepository.createGammeOperation({
                        id_gamme: req.params.id,
                        id_operation: req.body.operationList[i].id
                    })
                }
            }
            res.status(200).send(await gammeRepository.updateGamme(req.params.id, req.body));
        } else {
            res.status(400).send({ erreur: "Le libellé de la gamme est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        const gamme = await gammeRepository.getGammeById(req.params.id)
        if (gamme.id_piece !== null) {
            await pieceRepository.updatePieceIdGamme(gamme.id_piece, null)
        }
        await gammeRepository.deleteGamme(req.params.id)
        res.status(200).send({ success: "Supprimé" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;