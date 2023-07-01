const express = require("express");
const router = express.Router();

//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
//const autCtrl = require('./../controllers/auth.controller');
// definiendo rutas
router.post('/login', usuarioCtrl.loginUsuario); //auth estaba en todos mennos este creo
router.post('/', usuarioCtrl.createUsuario);
router.put('/:id', usuarioCtrl.editUsuario); 
router.delete('/:id', usuarioCtrl.deleteUsuario);
router.get('/:id', usuarioCtrl.getUsuario);
router.get('/', usuarioCtrl.getUsuarios);

//exportacion del modulo de rutas
module.exports = router;
