const express = require('express');
const router = express.Router();
const pieceRepository = require('../../../models/Atelier/Piece/piece-repository');
const gammeRepository = require('../../../models/Atelier/Gamme/gamme-repository');
const piececompoRepository = require('../../../models/Atelier/Piece/piece_compo-repository')
const { validateJWT } = require('../../../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await pieceRepository.getAllPiece());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.id) {
            const piece = await pieceRepository.getPieceById(req.body.id)
            const gamme = await gammeRepository.getGammeById(piece.id_gamme)
            const piececompo = await piececompoRepository.getAllPieceCompoByIdPiece(req.body.id)
            res.status(200).send({
                piece: piece,
                gamme: gamme,
                piececompo: piececompo
            });
        } else {
            res.status(400).send({ erreur: "L'id de la pièce est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getIdWithoutInter', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            res.status(200).send(await pieceRepository.getPieceByIdWhitoutInter(req.body.id));
        } else {
            res.status(400).send({ erreur: "L'id de la pièce est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await pieceRepository.getPieceByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé de la pièce est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }

});

router.post('/rechCompoLibelle', validateJWT, async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await pieceRepository.getPieceCompoByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé de la pièce est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLivrable', validateJWT, async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await pieceRepository.getPieceLivrableByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé de la pièce est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechAchFournisseur', validateJWT, async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await pieceRepository.getPieceAchetableByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé de la pièce est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/add', validateJWT, async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
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
                const compoExist = await piececompoRepository.getPieceCompoByIdPieceAndCompo(parseInt(compo.id_piece_composant), parseInt(compo.id_piece_compose))
                if (compoExist.length > 0) {
                    await piececompoRepository.updatePieceCompo(compo, compo.id_piece_composant, compo.id_piece_compose)
                } else {
                    await piececompoRepository.createPieceCompo(compo)
                }
            }
        }
        res.status(200).send(await pieceRepository.updatePiece(req.params.id, req.body));
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        const piece = await pieceRepository.getPieceById(req.params.id)
        if (piece.id_gamme !== null && piece.id_gamme !== undefined) {
            await gammeRepository.updateGammeIdPiece(piece.id_gamme, null)
        }
        await pieceRepository.deletePiece(req.params.id)
        res.status(200).send({ success: "Supprimé" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

exports.initializeRoutes = () => router;