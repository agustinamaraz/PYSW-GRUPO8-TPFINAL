const mongoose = require('mongoose');
const { Schema } = mongoose; 
const Paciente = require('./paciente');
const DatosMedicosSchema = new Schema({
    paciente: {type: Schema.Types.ObjectId, ref: Paciente, required:true },
    fecha: { type: String, required: true },
    peso: { type: Number, required: true },
    imc: {type: Number, required: true },
    talla: { type: Number, required: true },
    tension_arterial:{ type: Number, required: true },
    diagnostico:{ type:String, required: true }
})

module.exports = mongoose.models.DatosMedicos || mongoose.model('DatosMedicos', DatosMedicosSchema);