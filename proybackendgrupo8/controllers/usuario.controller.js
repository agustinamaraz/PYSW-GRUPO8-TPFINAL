const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getToken, getTokenData, getTokenPassword } = require('../config/jwt.config');
const Usuario = require('./../models/usuario');
const { v4: uuidv4 } = require('uuid');
const { getTemplate, sendEmail, sendEmailPassword, getTemplatePassword } = require('../config/email.config');
const usuarioCtrl = {}

usuarioCtrl.createUsuario = async (req, res) => {
    console.log("create usuario");
    const [isNewUsername, isNewUser] = await Promise.all([
        Usuario.isThisUsernameInUse(req.body.username),
        Usuario.isThisEmailInUse(req.body.email)
    ]);
    if (!isNewUsername && !isNewUser) {
        return res.status(448).json({
            success: false,
            message: 'El email y nombre de usuario ya están en uso',
        });
    }
    if (!isNewUsername) {
        return res.status(449).json({
            success: false,
            message: 'Este nombre de usuario ya está en uso',
        });
    }

    if (!isNewUser) {
        return res.status(450).json({
            success: false,
            message: 'Este email ya está en uso',
        });
    }
    //en req.body se espera que vengan los datos de usuario a crear
    const code = uuidv4();
    console.log(req.body.email)
    const usuario = new Usuario( { 
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        code: code,
        status: 'UNVERIFIED',
        rol: req.body.rol
    });
    email = req.body.email
    username= req.body.username
    const token = getToken({ email, code });
    const template = getTemplate(username, token);

    // Enviar el email
    await sendEmail(email, 'Confirmar Correo Electrónico', template);
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
usuarioCtrl.confirm = async (req, res) => {
    console.log("Entrando")
    try {
        console.log("Entrando al try")
        // Obtener el token
        const { token } = req.params;
        console.log("Entrando a data " , token)

        // Verificar la data
        const data = await getTokenData(token);
        console.log("Entrando a data " , data)

        if (data === null) {
            return res.json({
                success: false,
                msg: 'Error al obtener data'
            });
        }

        const { email, code } = data.data;
        console.log("Entrando a data " , data.data)

        // Verificar existencia del usuario
        const user = await Usuario.findOne({ email });
        console.log("Entrando a data " , user)

        if (user === null) {
            return res.json({
                success: false,
                msg: 'Usuario no existe'
            });
        }

        // Verificar el código
        if (code !== user.code) {
            return res.json({
                success: false,
                msg: 'Código incorrecto'
            });
        }

        // Actualizar usuario
        user.status = 'VERIFIED';
        console.log("Entrando a data " , user.status)
        await Usuario.updateOne({ email }, { $set: { status: 'VERIFIED' } });


        // Enviar respuesta exitosa al cliente
        return res.json({
            success: true,
            msg: 'Usuario confirmado correctamente'
        });

    } catch (error) {
        console.log(error);
        // Enviar respuesta de error al cliente
        return res.status(500).json({
            success: false,
            msg: 'Error al confirmar usuario'
        });
    }
};
usuarioCtrl.askReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
        return res.json({
            success: false,
            msg: 'Usuario no encontrado'
        });
    }
    if(user){
        const code = uuidv4();
        const token = getTokenPassword({ email});
        const emailSubject = 'Recuperación de Contraseña';
        const emailHtml = getTemplatePassword(user.username, token);
        sendEmailPassword(user.email, emailSubject, emailHtml);
        return res.json({
            success: true,
            msg: 'Usuario encontrado'
        });
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        msg: 'Error al solicitar restablecimiento de contraseña'
        });
    }
};
usuarioCtrl.resetPassword = async (req, res) => {
    console.log("Entrando reset password")
        const { token } = req.params;
        console.log(req.body.password)
        const { password } = req.body;
        console.log(password)
        try {
        // Verificar la validez del token
        const data = await getTokenData(token);
        if (!data) {
            return res.json({
            success: false,
            msg: 'Token inválido'
            });
        }
    
        // Obtener el usuario asociado al token
        const { email } = data.data;
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.json({
            success: false,
            msg: 'Usuario no encontrado'
            });
        }
    
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log(hashedPassword)
        console.log(user.email + user.username + user.password)
        // Actualizar la contraseña del usuario en la base de datos
        user.password = hashedPassword;
        console.log(user.password)
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );
        console.log(passwordMatch + ' HOLAAAAAAA')
        await Usuario.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
    
        return res.json({
            success: true,
            msg: 'Contraseña restablecida correctamente'
        });
        } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: 'Error al restablecer la contraseña'
        });
        }
};

usuarioCtrl.deleteUserNotVerified = async (req, res) => {
    try {
      // Obtener la lista de usuarios no verificados
    const usuariosNoVerificados = await Usuario.find({ status: 'UNVERIFIED' });
    if (usuariosNoVerificados.length === 0) {
        return res.json({
            success: true,
            msg: 'No hay usuarios no verificados para eliminar.'
        });
    }
        //Eliminar los usuarios no verificados
    await Usuario.deleteMany({ status: 'UNVERIFIED' });
    return res.json({
        success: true,
        msg: `Se han eliminado ${usuariosNoVerificados.length} usuarios no verificados.`,
        msg2: `${usuariosNoVerificados.forEach(u => u.email.toString)}`
    });
    } catch (error) {
    console.log(error);
    return res.json({
        success: false,
        msg: 'Error al eliminar usuarios no verificados.'
        });
    }
};
usuarioCtrl.loginUsuario = async (req, res) => {
    //en req.body se espera que vengan las credenciales de login
    //defino los criterios de busqueda en base al username y password recibidos
    const criteria = {
        username: req.body.username
    }

    try {
        const user = await Usuario.findOne(criteria).populate("rol");

        console.log(user + ' aaaaaaa')
        if (!user) {
            res.json({
                status: 0,
                msg: "not found"
            })
        } else {
            console.log(user.password + req.body.password)
            const passwordMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );
            console.log(passwordMatch + ' HOLAAAAAAA')
            if (passwordMatch) {
              // Las contraseñas coinciden, generando el token de autenticación
                const unToken = jwt.sign({ id: user._id }, 'secretkey');

            res.json({
                status: 1,
                msg: "success",
                username: user.username, //retorno información útil para el frontend
                rol: user.rol, //retorno información útil para el frontend
                userid: user._id, //retorno información útil para el frontend
                token: unToken
            })
        }
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
