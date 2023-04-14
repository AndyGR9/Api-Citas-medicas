const { request, response } = require('express');
const Citas = require('../models/citas');
const Medico = require('../models/medico');
var bcrypt = require('bcryptjs');
const moment = require('moment/moment');
const citas = require('../models/citas');


const citasGET = async (req = request, res = response) => {

    try {

        const citasL = await citas.find();

        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                citasL
            }
        );




    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}


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

        const {cedula} = req.body
        const medico = await Medico.findOne({ cedula: cedula })

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

const citasPOST = async (req = request, res = response) => {

    try {

        const Cita = await generarIdUnico();

        const { nombre, apellido, telefono, fecha, hora, especialidad, medico, cedula } = req.body

        const cita = new Citas({ idCita: Cita, nombre, apellido, telefono, fecha, hora, especialidad, medico });


        const medicoAsig = await Medico.findOne({ cedula: cedula })

        if (!medicoAsig) {
            return res.status(404).json({ error: 'No se encontró el medico' });
        }

        cita.fecha = moment(fecha, "DD/MM/YYYY").toISOString()

        cita.hora = moment(hora, "HH:mm").toISOString()


        medicoAsig.citasActivas.push({ idCita: Cita, fecha: cita.fecha, hora: cita.hora });

        await medicoAsig.save();
        await cita.save();

        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                cita
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const citasPUT = async (req = request, res = response) => {

    try {
        const { id } = req.params;


        // 
        const { password, google, ...resto } = req.body;

        if (password) {
            const salt = bcrypt.genSaltSync();
            resto.password = bcrypt.hashSync(password, salt);
        }

        const updated = await Usuario.findByIdAndUpdate(id, resto);
        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo PUT",
                updated
            }
        );
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo PUT');
    }
}


const citasDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        const eliminado = await Citas.findOneAndDelete({idCita: id})

        const citaMedico = await Medico.findOneAndDelete()

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

async function generarIdUnico() {
    const Cita = String(Math.floor(Math.random() * 500) + 1);

    try {
        const resultado = await citas.findOne({ idCita: Cita });
        if (resultado) {
            // El número ya existe en la base de datos, se llama a la función de nuevo
            return generarNumeroUnico();
        } else {
            // El número no existe en la base de datos, se retorna
            return Cita;
        }
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    citasGET,
    medicoGET,
    medicoGETAll,
    citasPOST,
    citasPUT,
    citasDELETE
}