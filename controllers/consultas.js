const { request, response } = require('express');
const Consulta = require('../models/consultas');
const Paciente = require('../models/paciente');


const consultaGET = async (req = request, res = response) => {

    try {

        const consultaN = await Consulta.find({cedula: req.body.cedula});

        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                consultaN
            }
        );




    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}


const consultaGETAll = async (req = request, res = response) => {

    try {

        const consultaN = await Consulta.find();

        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                consultaN
            }
        );




    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const detallesPOST = async (req = request, res = response) => {

    try {

        const { nombre, apellidos, cedula, edad, detallesPaciente } = req.body

        const consulta = new Consulta({ nombre, apellidos, cedula, edad, detallesPaciente});

        const resultado = await Consulta.insertMany(consulta); 
       
        
        const paciente = await Paciente.updateMany(
            { cedula: cedula },
            {
              $push: {
                peso_presion: detallesPaciente
              }
            }
          );


        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                resultado,
                paciente
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const diagnosticoPOST = async (req = request, res = response) => {

    try {

        const {diagnostico, medicamentos, examenes, cedula } = req.body

        const consulta = await Consulta.findOne({cedula: cedula});
        console.log(consulta)

        consulta.diagnostico.push({diagnostico: diagnostico, medicamentos: medicamentos, examenes: examenes });
        

        await consulta.save();

        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                consulta
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}





module.exports = {
    consultaGET,
    consultaGETAll,
    detallesPOST,
    diagnosticoPOST,
}