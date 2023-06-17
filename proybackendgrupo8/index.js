const express = require('express');
const cors = require('cors');
const { mongoose } = require('./database');
var app = express();
//middlewares
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

//Cargamos el modulo de direccionamiento de rutas
app.use('/api/producto', require('./routes/producto.route.js'));
app.use('/api/transaccion', require('./routes/transaccion.route.js'));
app.use('/api/espectador',require('./routes/espectador.route.js'));
app.use('/api/ticket',require('./routes/ticket.route.js'));

//setting
app.set('port', process.env.PORT || 3000);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Servidor iniciado en el puerto: `, app.get('port'));
});