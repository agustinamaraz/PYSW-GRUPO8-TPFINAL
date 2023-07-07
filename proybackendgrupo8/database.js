const mongoose = require('mongoose');
<<<<<<< Updated upstream
const URI = 'mongodb://localhost/pysw-grupo8-tpfinal';
=======
const URI ='mongodb+srv://emival3:OdnNRKwMg6PviHEo@puestodesalud.jxrrtnf.mongodb.net/';
//const URI= 'mongodb+srv://emival3:<password>@puestodesalud.jxrrtnf.mongodb.net/'
//const URI = 'mongodb://127.0.0.1:27017/pysw-grupo8-tpfinal';
//const URI = 'mongodb://agustina:admin@127.0.0.1:27017/DBCENTRODESALUD';
//const URI = 'mongodb://0.0.0.0/pysw-grupo8-tpfinal';

>>>>>>> Stashed changes
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err))
module.exports = mongoose;