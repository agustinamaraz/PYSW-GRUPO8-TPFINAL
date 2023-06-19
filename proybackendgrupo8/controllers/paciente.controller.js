const Paciente = require('../models/paciente');
const pacienteCtrl = {}

//get todos
pacienteCtrl.getPacientes = async (req, res) => {
    console.log("Entrando a get")
       var pacientes = await Paciente.find(); 
    res.json(pacientes);
 }
//create
pacienteCtrl.createPaciente = async (req, res) => {
    console.log("Entrando a create")
    console.log(req.body);
    var paciente = new Paciente(req.body);
    try {
        await paciente.save();
        res.json({
            'status': '1',
            'msg': 'Paciente guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
//get one
pacienteCtrl.getPaciente = async (req, res) => {
    console.log("Entrando a get by id")
    const paciente = await Paciente.findById(req.params.id);
    res.json(paciente);
}
//edit
pacienteCtrl.editPaciente = async (req, res) => {
    console.log("Entrando a edit")
    const vpaciente = new Paciente(req.body);
    try {
        await Paciente.updateOne({ _id: req.body._id }, vpaciente);
        res.json({
            'status': '1',
            'msg': 'Paciente updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
//delete
pacienteCtrl.deletePaciente = async (req, res) => {
    console.log("Entrando a delete")
    try {
        await Paciente.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: '1',
            msg: 'Paciente removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
module.exports = pacienteCtrl; 