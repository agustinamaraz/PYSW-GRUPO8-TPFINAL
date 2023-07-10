const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
var app = express();
//middlewares
app.use(express.json());

//app.use(cors({ origin: 'http://3.82.255.160' }));
//app.use(cors({ origin: 'http://localhost:4200' }));

const allowedOrigins = ['http://localhost:4200', 'http://3.82.255.160'];

app.use(cors({ origin: allowedOrigins })); //Hay que agregar eso al repositorio del backend


//Cargamos el modulo de direccionamiento de rutas
app.use('/api/usuario', require('./routes/usuario.route.js'));
app.use('/api/rol', require('./routes/rol.route.js'));
app.use('/api/paciente', require('./routes/paciente.route.js'));
app.use('/api/datosMedicos', require('./routes/datosMedicos.route.js'));
app.use('/api/anuncio', require('./routes/anuncio.route.js'));
app.use('/api/contacto', require('./routes/contacto.route.js'));


//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto: `, app.get('port'));
});