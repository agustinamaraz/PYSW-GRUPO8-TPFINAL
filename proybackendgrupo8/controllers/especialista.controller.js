const Especialista = require('./../models/especialista')
const especialistaCtrl = {}

especialistaCtrl.createEspecialista = async (req, res) => {
    //en req.body se espera que vengan los datos de usuario a crear
    console.log("entrando a crear un especialista...");
    const especialista = new Especialista(req.body);
    try {
        await especialista.save();
        res.status(200).json({
            'status': '1',
            'msg': 'especialista guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

especialistaCtrl.getEspecialistas = async (req, res) => {
    var esp = await Especialista.find();
    res.json(esp);
}

especialistaCtrl.getEspecialista = async (req, res) => {
    const e = await Especialista.findById(req.params.id);
    res.json(e);
}

especialistaCtrl.editEspecialista = async (req, res) => {
    const ve = new Especialista(req.body);
    try {
        await Especialista.updateOne({ _id: req.body._id }, ve);
        res.json({
            'status': '1',
            'msg': 'Especialista updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
especialistaCtrl.deleteEspecialista = async (req, res) => {
    try {
        await Especialista.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Especialista removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

especialistaCtrl.getEspecialistaDni = async (req, res) => {
    console.log("ENTRANDO A ESPECIALISTAS POR  dni");
    criteria = {};
    if (req.query.dniP != null && req.query.dniP!= "") {
      criteria.dni = {$regex: req.query.dniP, $options:""};
    }
    var pacientes = await Especialista.find(criteria);
    res.json(pacientes);
}

//exportacion del modulo controlador
module.exports = especialistaCtrl;