const express = require('express');
const router = express.Router();
const posteRepository = require('../../../models/Atelier/Poste/poste-repository');
const postemachineRepository = require('../../../models/Atelier/Poste/poste_machine-repository');
const machineRepository = require('../../../models/Atelier/Machine/machine-repository');
const { validateJWT } = require('../../../Security/auth');

router.get('/getAll', validateJWT, async (req, res) => {
    try {
        res.status(200).send(await posteRepository.getAllPoste());
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechLibelle', validateJWT, async (req, res) => {
    try {
        if (req.body.libelle) {
            res.status(200).send(await posteRepository.getPosteByLibelle(req.body.libelle));
        } else {
            res.status(400).send({ erreur: "Le libellé du poste est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/getId', validateJWT, async (req, res) => {
    try {
        if (req.body.id) {
            console.log("poste : " + req.body.id);
            const poste = await posteRepository.getPosteById(req.body.id)
            const posteMachine = await postemachineRepository.getAllPosteMachineByIdPoste(req.body.id)
            var listeMachine = []
            for (let i = 0; i < posteMachine.length; i++) {
                const machine = await machineRepository.getMachineById(posteMachine[i].id_machine)
                listeMachine.push(machine)
            }
            res.status(200).send({
                id: poste.id,
                libelle: poste.libelle,
                description: poste.description,
                machines: listeMachine
            });
        } else {
            res.status(400).send({ erreur: "L'id du poste est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/rechPosteByQual', validateJWT, async (req, res) => {
    try {
        if (req.body.id_uti) {
            res.status(200).send(await posteRepository.getPosteByQualification(req.body.id_uti, req.body.libelle));
        } else {
            res.status(400).send({ erreur: "L'id de l'utilisateur est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.post('/add', validateJWT, async (req, res) => {
    try {
        const poste = await posteRepository.createPoste(req.body)
        await req.body.posteMachine.forEach(element => {
            postemachineRepository.createPosteMachine({
                id_poste: poste.id,
                id_machine: element.id
            })
        });
        res.status(200).send(poste);
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.put('/update/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            for (let i = 0; i < req.body.machines.length; i++) {
                if (await postemachineRepository.getPosteMachineByIdPosteAndIdMachine(req.params.id, req.body.machines[i].id) === null) {
                    postemachineRepository.createPosteMachine({
                        id_poste: req.params.id,
                        id_machine: req.body.machines[i].id
                    })
                }
            }
            res.status(200).send(await posteRepository.updatePoste(req.params.id, req.body));
        } else {
            res.status(400).send({ erreur: "L'id du poste est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
});

router.delete('/delete/:id', validateJWT, async (req, res) => {
    try {
        if (req.params.id) {
            await posteRepository.deletePoste(req.params.id)
            res.status(200).send({ success: "Supprimé" });
        } else {
            res.status(400).send({ erreur: "L'id du poste est invalide" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ erreur: error.message });
    }
    
});

exports.initializeRoutes = () => router;