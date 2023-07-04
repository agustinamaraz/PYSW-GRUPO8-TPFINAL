const nodemailer = require('nodemailer');

const mail = {
    user: 'centrodesaludutil@gmail.com',
    pass: 'nagcujcrpwpjgndc'
}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
});

const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: ` <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hola", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}

const sendEmailPassword = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: ` <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hola", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}
const getTemplate = (username, token) => {
    return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h2>Hola ${ username }</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:4200/confirm/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
    `;
}
const getTemplatePassword = (username, token) => {
    return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h2>Hola ${ username }</h2>
            <p>Para resetear tu contraseña, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:4200/reset/${ token }"
                target="_blank"
            >Resetear contraseña</a>
        </div>
    `;
}

module.exports = {
    sendEmail,
    getTemplate,
    sendEmailPassword,
    getTemplatePassword
}