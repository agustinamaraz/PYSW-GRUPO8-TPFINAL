const mongoose = require('mongoose');
const URI ='mongodb+srv://emival3:OdnNRKwMg6PviHEo@puestodesalud.jxrrtnf.mongodb.net/';
//mongodb+srv://emival3:<password>@puestodesalud.jxrrtnf.mongodb.net/
//const URI = 'mongodb://127.0.0.1:27017/pysw-grupo8-tpfinal';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
module.exports = mongoose;