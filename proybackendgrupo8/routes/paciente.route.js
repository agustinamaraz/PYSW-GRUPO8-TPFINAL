const express = require('express');
const router = express.Router();

//defino controlador para el manejo de CRUD
const pacienteCtrl = require('./../controllers/paciente.controller');

// definiendo rutas
router.get('/', pacienteCtrl.getPacientes);
router.post('/', pacienteCtrl.createPaciente);
router.put('/:id', pacienteCtrl.editPaciente);
router.delete('/:id', pacienteCtrl.deletePaciente);
router.get('/:id', pacienteCtrl.getPacienteById);//agregagado 02/07
router.get('/dni', pacienteCtrl.getPacienteDni);//agregado 23/06

//exportacion del modulo de rutas
module.exports = router;