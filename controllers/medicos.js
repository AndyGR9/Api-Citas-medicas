const { request, response } = require('express');
const Citas = require('../models/citas');
const Medico = require('../models/medico');
const moment = require('moment/moment');


const medicoGETAll = async (req = request, res = response) => {

    try {

        const medico = await Medico.find();

        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                medico
            }
        );




    }
    catch (err) { 
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const medicoGET = async (req = request, res = response) => {

    try {

        let { cedula, especialidad } = req.params

        if (!cedula && !especialidad) {
            return res.status(404).json({ error: 'Debe ingresar datos para realizar la busqueda' });
        }

        if(!especialidad){
            especialidad=''
        }

        if(!cedula){
            cedula=''
        }

        const medico = await Medico.find({ $or: [{ cedula: cedula.replace(/\s/g, '') }, { especialidad: especialidad.replace(/\s/g, '') }] })


        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET", 
                medico
            }
        );


    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const medicoPOST = async (req = request, res = response) => {

    try {

        const { nombre, apellido, email, especialidad, cedula } = req.body

        let medico = await Medico.findOne({ cedula: cedula.replace(/\s/g, '') })
            medico = await Medico.findOne({ email: email.replace(/\s/g, '') })

        if (medico) {
            return res.status(404).json({ error: 'El medico selecionado ya está registrado' });
        }

        
        const med = new Medico({ nombre, apellido, email, especialidad, cedula });

        await med.save();

        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                med
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const medicoDELETE = async (req = request, res = response) => {

    try {

        const { cedula } = req.body;

        const medico = await Medico.findOne({ cedula: cedula })

        if (!medico) {
            return res.status(404).json({ error: 'El medico selecionado NO está registrado o la cedula es incorrecta' });
        }

        if (medico.citasActivas.length > 0) {
            return res.status(404).json({ error: 'El medico no se puede eliminar porque posee citas activas' });
        }

        const eliminado = await Medico.findOneAndDelete({ cedula: cedula })


        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo DELETE",
                eliminado
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    medicoGET,
    medicoGETAll,
    medicoPOST,
    medicoDELETE

}