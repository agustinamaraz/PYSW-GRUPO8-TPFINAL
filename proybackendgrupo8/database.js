const mongoose = require('mongoose');
//const URI ='mongodb+srv://emival3:OdnNRKwMg6PviHEo@puestodesalud.jxrrtnf.mongodb.net/';
const URI = 'mongodb://0.0.0.0/pysw-grupo8-tpfinal';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
module.exports = mongoose;