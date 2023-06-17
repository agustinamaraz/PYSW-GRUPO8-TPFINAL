const mongoose = require("mongoose");
const {Schema} = mongoose;
const UsuarioSchema = new Schema({
username: {type: String, required: true},
password: {type:String, required:true},
nombres: {type:String, required:true}, // opcional: puede almacenarse en otra clase
apellido: {type:String, required:true}, // opcional: puede almacenarse en otra clase
perfil: {type:String, required: true} //administrador - visitante - administrativo
});
//exporto objeto para que pueda ser usado en otros lugares
module.exports = mongoose.model('Usuario', UsuarioSchema);