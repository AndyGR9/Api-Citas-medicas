const { request, response } = require('express');
const Citas = require('../models/citas');
const Medico = require('../models/medico');
const moment = require('moment/moment');
const Paciente = require('../models/paciente');


const citasGET = async (req = request, res = response) => {

    try {

        const { idCita } = req.params

        const citasL = await Citas.findOne({ idCita: idCita.replace(/\s/g, '')  });

        // let fech = moment(citasL.fecha)
        // console.log(fech.format("DD/MM/YYYY"))

        // let hor = moment(citasL.hora)
        // console.log(hor.format("HH:mm"))

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

const citasGETAll = async (req = request, res = response) => {

    try {
        const citasL = await Citas.find();

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


const citasPOST = async (req = request, res = response) => {

    try {

        const Cita = await generarIdUnico();

        const { cedulaPaciente, fecha, hora, telefono, especialidad, cedulaMedico } = req.body

        const paciente = await Paciente.findOne({ cedula: cedulaPaciente })

        if (!paciente) {
            return res.status(404).json({ error: 'El paciente selecionado no existe' });
        }

        const cita = new Citas({ idCita: Cita, nombre: paciente.nombre, apellido: paciente.apellidos,cedulaPaciente, telefono, fecha, hora, especialidad, cedulaMedico: cedulaMedico });


        const medicoAsig = await Medico.findOne({ cedula: cedulaMedico })

        if (medicoAsig.especialidad.toLowerCase() !== especialidad.replace(/\s/g, '').toLowerCase()) {
            return res.status(404).json({ error: 'La especialidad no coincide con la del médico' });
        }

        cita.especialidad = especialidad.replace(/\s/g, '').toLowerCase()

        cita.fecha = moment(fecha, "DD/MM/YYYY").toISOString()

        cita.hora = moment(hora, "HH:mm").toISOString()

        cita.medico = medicoAsig.nombre + " " + medicoAsig.apellido
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




const citasDELETE = async (req = request, res = response) => {

    try {

        const { id } = req.body;

        const eliminado = await Citas.findOneAndDelete({ idCita: id })

        if (!eliminado) {
            return res.status(404).json({ error: 'No se encontró la cita' });
        }

        const med = await Medico.updateOne(
            { cedula: eliminado.cedulaMedico },
            { $pull: { citasActivas: { idCita: id } } }
        )

        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo DELETE",
                eliminado,
                med
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
        const resultado = await Citas.findOne({ idCita: Cita });
        if (resultado) {
            // El número ya existe en la base de datos, se llama a la función de nuevo
            return generarIdUnico();
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
    citasGETAll,
    citasPOST,
    citasDELETE
}