const mongoose = require('mongoose');
const { Schema } = mongoose; 
const Contacto = require('./contacto');

const PacienteSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: {type:String,required:true},
    fechaNac: { type: String, required: true },
    dni:{ type:String, required: true},
    contactos:[{type:Contacto.schema}]
})

                          
module.exports = mongoose.models.Paciente || mongoose.model('Paciente', PacienteSchema);