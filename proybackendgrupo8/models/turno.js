const mongoose = require('mongoose');
const { Schema } = mongoose;

const Especialista = require('./especialista');
const Paciente = require('./paciente');

const TurnoSchema = new Schema({
    fecha: {type:String, required:true},
    cantidadTurnos:{type:Number, required:true},
    hora:{type:String, required:true},
    lapso:{type:String,required:true},
    especialista: { type: Schema.Types.ObjectId, ref: Especialista, required: true },
    paciente: { type: Schema.Types.ObjectId, ref: Paciente || null },
    estado: {type :String, required:true},
    centroSalud:{ type:String, required: true}
})

                          
module.exports = mongoose.models.Turno || mongoose.model('Turno', TurnoSchema);