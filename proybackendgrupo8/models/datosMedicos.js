const mongoose = require('mongoose');
const { Schema } = mongoose; 

const DatosMedicosSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni:{ type: String, required: true},
    fecha: { type: String, required: true },
    peso: { type: Number, required: true },
    imc: {type: Number, required: true },
    talla: { type: Number, required: true },
    tension_arterial:{ type: Number, required: true },
    diagnostico:{ type:String, required: true }
})

module.exports = mongoose.models.DatosMedicos || mongoose.model('DatosMedicos', DatosMedicosSchema);