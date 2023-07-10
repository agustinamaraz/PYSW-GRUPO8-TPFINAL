const mongoose = require('mongoose');
const { Schema } = mongoose;

const Especialista = require('./especialista');
const Paciente = require('./paciente');

const TurnoSchema = new Schema({
    fecha: {type:String},
    hora : {type :String },
    especialista: { type: Schema.Types.ObjectId, ref: Especialista, required: true },
    paciente: { type: Schema.Types.ObjectId, ref: Paciente, required: true },
    estado: {type :String }
})

                          
module.exports = mongoose.models.Turno || mongoose.model('Turno', TurnoSchema);