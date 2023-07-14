const express = require("express");
const router = express.Router();
const especialistaCtrl = require('./../controllers/especialista.controller.js');
router.get('/', especialistaCtrl.getEspecialistas);
router.get('/busquedaEspecialista', especialistaCtrl.busquedaEspecialista);//agregado 13/07
router.get('/dniEspecialista', especialistaCtrl.getEspecialistaDni);
router.get('/:id', especialistaCtrl.getEspecialista);
router.post('/', especialistaCtrl.createEspecialista);
router.put('/:id', especialistaCtrl.editEspecialista);
router.delete('/:id', especialistaCtrl.deleteEspecialista);

module.exports = router;
