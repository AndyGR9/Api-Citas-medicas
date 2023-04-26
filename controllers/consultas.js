const { request, response } = require('express');
const Consulta = require('../models/consultas');
const Paciente = require('../models/paciente');


const consultaGET = async (req = request, res = response) => {

    try {

        const { cedula } = req.params

        const consultaN = await Consulta.find({ cedula: cedula.replace(/\s/g, '') });


        if (consultaN.length<=0) {
            return res.status(404).json({ error: 'La consulta solicitada no existe' });
        }

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

        const { cedula, detallesPaciente } = req.body

        const pacientN = await Paciente.findOne({ cedula: cedula.replace(/\s/g, '')})

        if (!pacientN) {
            return res.status(404).json({ error: 'El paciente al que desea abrir consulta no se encuentra registrado' });
        }

        const consulta = new Consulta({ nombre: pacientN.nombre, apellidos: pacientN.apellidos, cedula:cedula.replace(/\s/g, ''), edad: pacientN.edad, detallesPaciente });

        const resultado = await Consulta.insertMany(consulta);


        const paciente = await Paciente.updateMany(
            { cedula: cedula.replace(/\s/g, '') },
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

        const { diagnostico, examenes, id } = req.body

        const consulta = await Consulta.findOne({ _id: id });
        if (!consulta) {
            return res.status(404).json({ error: 'No se encontró la consulta' });
        }


        consulta.diagnostico.push(...diagnostico);
        consulta.examenes.push(...examenes);

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

const examenesPOST = async (req = request, res = response) => {

    try {

        const { examenes, id } = req.body

        const consultN = await Consulta.findOne({ _id: id });
        if (!consultN) {
            return res.status(404).json({ error: 'No se encontró la consulta' });
        }
        
        let consulta
        if (consultN.examenes.length===examenes.length) {
            consulta = await Consulta.updateOne(
            { _id: id },
            { $set: { examenes: examenes } }
          );
        } else {
            return res.status(404).json({ error: 'No puede modificar mas datos de los que estan registrados' }); 
        }
        
          



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
    examenesPOST
}