const Paciente = require('../models/paciente');
const DatosMedicos = require ('../models/datosMedicos')
const pacienteCtrl = {}

//get todos
pacienteCtrl.getPacientes = async (req, res) => {
    console.log("Entrando a get")
       var pacientes = await Paciente.find(); 
    res.json(pacientes);
 }
 //get id
 pacienteCtrl.getPacientebyId = async (req, res) => {//siempre cunado las solicitudes vienen por http se reciben obetos el req y el res
    const paciente = await Paciente.findById(req.params.id);
  res.json(paciente);
 }

//get paciente por dni(agregado 23/06)
pacienteCtrl.getPacienteDni = async (req, res) => {
    console.log("ENTRANDO A Paciente po dni");
    criteria = {};
    if (req.query.dniP != null && req.query.dniP!= "") {
      criteria.dni = {$regex: req.query.dniP, $options:""};
    }
    var pacientes = await Paciente.find(criteria);
    res.json(pacientes);
}
  pacienteCtrl.busquedaPaciente = async (req, res) => {
        var paciente = await Paciente.find({
          $or: [
            { nombre: { $regex: req.query.dato, $options: "i" } },
            { apellido: { $regex: req.query.dato, $options: "i"} }
          ],
        });

        res.json(paciente);
        console.log(res.json);
      };
  

pacienteCtrl.getOnePacienteDni = async (req,res)=>{
    const paciente = await Paciente.findOne({ dni: req.params.dni })
    res.json(paciente);
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
        await DatosMedicos.deleteMany({ paciente: req.params.id });

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