const { request, response } = require('express');
const Citas = require('../models/citas');
const Medico = require('../models/medico');
const moment = require('moment/moment');
const Paciente = require('../models/paciente');


const citasGET = async (req = request, res = response) => {

    try {

        const { idCita } = req.body

        const citasL = await Citas.findOne({ idCita: idCita });

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

        const { cedula } = req.body
        const medico = await Medico.findOne({ cedula: cedula })

        if (!medico) {
            return res.status(404).json({ error: 'El medico selecionado no existe' });
        }

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

        const { cedulaPaciente, fecha, hora, telefono, especialidad, cedulaMedico } = req.body

        const paciente = await Paciente.findOne({ cedula: cedulaPaciente })

        if (!paciente) {
            return res.status(404).json({ error: 'El paciente selecionado no existe' });
        }

        const cita = new Citas({ idCita: Cita, nombre: paciente.nombre, apellido: paciente.apellidos, telefono, fecha, hora, especialidad, cedulaMedico: cedulaMedico });


        const medicoAsig = await Medico.findOne({ cedula: cedulaMedico })


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

const citasPUT = async (req = request, res = response) => {

    try {

        const { id, cedulaPaciente,fecha, hora, telefono, especialidad, cedulaMedico } = req.body

        const paciente = await Paciente.findOne({ cedula: cedulaPaciente })
        const cita = await Citas.findOne({ idCita: id });
        const medicoAsig = await Medico.findOne({ cedula: cedulaMedico })

        if (!cita) {
            return res.status(404).json({ error: 'No se encontró la cita selecionada' });
        }

        if (!medicoAsig) {
            return res.status(404).json({ error: 'No se encontró el medico' });
        }

        if (!paciente) {
            return res.status(404).json({ error: 'El paciente selecionado no existe' });
        }

        if (cita.cedulaMedico != cedulaMedico) {

            const citaOcupada = await Medico.findOne(fecha,hora)

            if (!citaOcupada) {
                await Medico.updateOne(
                    { idCita: id },
                    { $pull: { citasActivas: { idCita: id } } }
                )

                medicoAsig.citasActivas.push({ idCita: id, fecha: cita.fecha, hora: cita.hora });
                await medicoAsig.save();

            } else {
                return res.status(404).json({ error: 'El el medico al que desea asignar la cita ya tiene una cita en el horario seleccionado' });
            }

        }


        const updated = await Citas.updateOne(
            {
                idCita: id
            },
            {
                $set: {
                    nombre: paciente.nombre,
                    apellido: paciente.apellidos,
                    telefono: telefono,
                    especialidad: especialidad,
                    cedulaMedico: cedulaMedico,
                    medico: medicoAsig.nombre + " " + medicoAsig.apellido
                },
            },
        );




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

        const { id } = req.body;

        const eliminado = await Citas.findOneAndDelete({ idCita: id })

        if (!eliminado) {
            return res.status(404).json({ error: 'No se encontró la cita' });
        }

        const med = await Medico.updateOne(
            { idCita: id },
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
    citasGETAll,
    medicoGET,
    medicoGETAll,
    citasPOST,
    citasPUT,
    citasDELETE
}