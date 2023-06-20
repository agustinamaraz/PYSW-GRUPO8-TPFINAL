const Usuario = require('./../models/usuario')
const usuarioCtrl = {}

usuarioCtrl.createUsuario = async (req, res) => {
    console.log("create usuario");
    //en req.body se espera que vengan los datos de usuario a crear
    const usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.status(200).json({
            'status': '1',
            'msg': 'Usuario guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

usuarioCtrl.loginUsuario = async (req, res) => {
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
        username: req.body.username,
        password: req.body.password
    }

    try {
        const data = await Usuario.findOne(criteria).populate("rol");

        if (!data) {
            res.json({
                status: 0,
                msg: "not found"
            })
        } else {
            res.json({
                status: 1,
                msg: "success",
                username: data.username, //retorno información útil para el frontend
                rol: data.rol, //retorno información útil para el frontend
                userid: data._id //retorno información útil para el frontend
            })
        }
    } catch (error) {
        console.log(error);
    }
    //el método findOne retorna un objeto que cumpla con los criterios de busqueda

}

usuarioCtrl.getUsuarios = async (req, res) => {
    var usuarios = await Usuario.find().populate("rol");
    res.json(usuarios);
}

usuarioCtrl.getUsuario = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id).populate("rol");
    res.json(usuario);
}

usuarioCtrl.editUsuario = async (req, res) => {
    const vusuario = new Usuario(req.body);
    try {
        await Usuario.updateOne({ _id: req.body._id }, vusuario);
        res.json({
            'status': '1',
            'msg': 'Usuario updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}
usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Usuario removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

//exportacion del modulo controlador
module.exports = usuarioCtrl;
