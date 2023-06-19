const express = require('express');
const router = express.Router();

//defino controlador para el manejo de CRUD
const pacienteCtrl = require('./../controllers/paciente.controller');

// definiendo rutas
router.get('/', pacienteCtrl.getPacientes);
router.post('/', pacienteCtrl.createPaciente);
router.get('/:id', pacienteCtrl.getPaciente);
router.put('/:id', pacienteCtrl.editPaciente);
router.delete('/:id', pacienteCtrl.deletePaciente);

//exportacion del modulo de rutas
module.exports = router;