const mongoose = require('mongoose');
const URI ='mongodb+srv://emival3:OdnNRKwMg6PviHEo@puestodesalud.jxrrtnf.mongodb.net/';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
module.exports = mongoose;