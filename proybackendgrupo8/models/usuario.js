const mongoose = require("mongoose");
const { Schema } = mongoose;
const Rol = require('./rol');
const UsuarioSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: Schema.Types.ObjectId, ref: Rol, required: true } //administrador - gestor - paciente
});
//exporto objeto para que pueda ser usado en otros lugares
module.exports = mongoose.model('Usuario', UsuarioSchema);