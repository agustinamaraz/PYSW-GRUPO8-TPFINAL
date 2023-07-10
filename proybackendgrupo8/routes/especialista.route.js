const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const especialistaCtrl = require('./../controllers/especialista.controller.js');
// definiendo rutas
router.post('/', especialistaCtrl.createEspecialista);
router.get('/dni', especialistaCtrl.getEspecialistaDni);
router.put('/:id', especialistaCtrl.editEspecialista);
router.delete('/:id', especialistaCtrl.deleteEspecialista);
router.get('/:id', especialistaCtrl.getEspecialista);
router.get('/', especialistaCtrl.getEspecialistas);
//exportacion del modulo de rutas
module.exports = router;
