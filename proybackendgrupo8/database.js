const mongoose = require('mongoose');

const URI ='mongodb+srv://centrosaludjujuy:<HqyMnE4nK4NYcaLy>@puestodesalud.sqakm7r.mongodb.net/';
//const URI= 'mongodb+srv://emival3:<password>@puestodesalud.jxrrtnf.mongodb.net/'
//const URI = 'mongodb://127.0.0.1:27017/pysw-grupo8-tpfinal';
//const URI = 'mongodb://agustina:admin@127.0.0.1:27017/DBCENTRODESALUD';

mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
module.exports = mongoose;