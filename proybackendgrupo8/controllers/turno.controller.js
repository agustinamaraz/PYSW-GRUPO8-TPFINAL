const Turno = require('./../models/turno')
const turnoCtrl = {}

turnoCtrl.createTurno = async (req, res) => {
    //en req.body se espera que vengan los datos de usuario a crear
    const turno = new Turno(req.body);
    try {
        await turno.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Turno guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

turnoCtrl.getTurnos = async (req, res) => {
    var turnos = await Turno.find();
    res.json(turnos);
}

turnoCtrl.getTurno = async (req, res) => {
    const turno = await Turno.findById(req.params.id);
    res.json(turno);
}

turnoCtrl.editTurno = async (req, res) => {
    const vturno = new Turno(req.body);
    try {
        await Turno.updateOne({ _id: req.body._id }, vturno);
        res.json({
            'status': '1',
            'msg': 'Turno updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
turnoCtrl.deleteTurno = async (req, res) => {
    try {
        await Turno.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Turno removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

//exportacion del modulo controlador
module.exports = turnoCtrl;