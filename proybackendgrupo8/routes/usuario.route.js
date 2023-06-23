const express = require("express");
const router = express.Router();

//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');
// definiendo rutas
router.post('/login', usuarioCtrl.loginUsuario);
router.post('/', autCtrl.verifyToken, usuarioCtrl.createUsuario);
router.put('/:id', autCtrl.verifyToken, usuarioCtrl.editUsuario);
router.delete('/:id', autCtrl.verifyToken, usuarioCtrl.deleteUsuario);
router.get('/:id', autCtrl.verifyToken, usuarioCtrl.getUsuario);
router.get('/', autCtrl.verifyToken, usuarioCtrl.getUsuarios);

//exportacion del modulo de rutas
module.exports = router;
