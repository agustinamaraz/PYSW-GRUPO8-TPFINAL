const DatosMedicos = require('../models/datosMedicos');
const datosMedicosCtrl = {}

//Recoger todos los datos Medicos
datosMedicosCtrl.getDatosMedicos = async (req,res) =>{
    var datosMedicos = await DatosMedicos.find().populate('paciente');
    res.json(datosMedicos);
}
//Crear datos medicos
datosMedicosCtrl.createDatosMedicos = async (req, res) => {
    console.log(req.body);
    var datosMedicos = new DatosMedicos(req.body)
    try{
        await datosMedicos.save();
        res.json({
            'status': '1',
            'msg': 'Datos medicos guardados.'
        })
    }catch (error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}
//Get data by id
datosMedicosCtrl.getDatosMedicosById = async (req,res)=>{
    const datosMedicos = await DatosMedicos.findById(req.params.id).populate('paciente');
    res.json(datosMedicos);
}
//Get data by dni
datosMedicosCtrl.getAllDatosMedicosDni = async (req,res)=>{
    try{
    const datosMedicos = await DatosMedicos.find({paciente:{dni:req.params.dni}}).populate('paciente');
    res.json(datosMedicos)
    }catch(error){
        res.status(500).json({
            status: '0',
            msg: 'Error retrieving transactions',
            });
    }
}
//Edit object data
datosMedicosCtrl.editDatosMedicos = async (req, res)=>{
    try{
        const datosmMedicosId = req.params.id;
        const vdatosMedicos = req.body;
        const result = await DatosMedicos.findByIdAndUpdate(datosmMedicosId, vdatosMedicos)
        if (result){
            res.json({
                'status': '1',
                'msg': 'Datos Medicos updated'
            });
        }else{
            res.json({
                'status':'0',
                'msg': 'Datos Medicos not Found'
            });
        }
    }catch (error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        });
    }
};
// Delete data by Id
datosMedicosCtrl.deleteDatosMedicos = async (req,res)=>{
        try {
            await DatosMedicos.deleteOne({ _id: req.params.id });
                res.status(200).json({
                    status: '1',
                    msg: 'Datos Medicos removed'
                })
        } catch (error) {
            res.status(400).json({
                'status': '0',
                'msg': 'Error procesando la operacion'
            })
        }
}
module.exports = datosMedicosCtrl
