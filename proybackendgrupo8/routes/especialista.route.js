const express = require("express");
const router = express.Router();
//defino controlador para el manejo de CRUD
const especialistaCtrl = require('./../controllers/especialista.controller.js');
// definiendo rutas
router.get('/', especialistaCtrl.getEspecialistas);
router.get('/busquedaEspecialista', especialistaCtrl.busquedaEspecialista);//agregado 13/07
router.post('/', especialistaCtrl.createEspecialista);
router.get('/:dni', especialistaCtrl.getEspecialistaDni);
router.put('/:id', especialistaCtrl.editEspecialista);
router.delete('/:id', especialistaCtrl.deleteEspecialista);
router.get('/:id', especialistaCtrl.getEspecialista);

//exportacion del modulo de rutas
module.exports = router;
