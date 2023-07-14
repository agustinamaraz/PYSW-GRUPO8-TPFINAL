const Turno = require('./../models/turno')
const Paciente = require('./../models/paciente')
const turnoCtrl = {}

turnoCtrl.createTurno = async (req, res) => {
    console.log("turno controller" + req.body)
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
    var turnos = await Turno.find().populate("especialista").populate("paciente");
    res.json(turnos);
}

turnoCtrl.getTurnosDisponibles = async (req, res) => {
    try {
        let criteria = {};
        if (req.query.estado != null && req.query.estado != "") {
            criteria.estado = req.query.estado;
        }
        var tickets = await Turno.find(criteria).populate("especialista").populate("paciente");
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los turnos disponibles' })
    }
}

turnoCtrl.getTurnosPaciente = async (req, res) => {
    try {
        const { dni } = req.query;

        // Obtener el ID del paciente a partir del DNI
        const paciente = await Paciente.findOne({ dni });
        if (!paciente) {
            return res.status(404).json({ mensaje: 'Paciente no encontrado' });
        }

        // Buscar los turnos del paciente por su ID
        const turnos = await Turno.find({ paciente: paciente._id }).populate("especialista").populate("paciente");

        return res.json(turnos);
    } catch (error) {
        console.error('Error al obtener los turnos del paciente:', error);
        return res.status(500).json({ mensaje: 'Error al obtener los turnos del paciente' });
    }
}

turnoCtrl.getTurno = async (req, res) => {
    const turno = await Turno.findById(req.params.id).populate("especialista").populate("paciente");
    res.json(turno);
}

turnoCtrl.editTurno = async (req, res) => {
    const vturno = new Turno(req.body);
    console.log(vturno.ce)
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