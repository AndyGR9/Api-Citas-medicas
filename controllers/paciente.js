const { request, response } = require('express');
const Paciente = require('../models/paciente');


const pacienteGET = async (req = request, res = response) => {

    try {

        const pacienteN = await Paciente.findOne({ cedula: req.body.cedula, estado: true });

        if (!pacienteN) {
            return res.status(404).json({ error: 'No se encontró el paciente' });
        }

        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                pacienteN
            }
        );




    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const pacienteGETAll = async (req = request, res = response) => {

    try {

        const paciente = await Paciente.find({ estado: true });


        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                paciente
            }
        );




    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}


const pacientePOST = async (req = request, res = response) => {

    try {

        const { nombre, apellidos, cedula, peso_presion, edad, altura, enfermedades, tipoSangre, alergias, contactoEmergencia } = req.body

        const pacienteN = await Paciente.findOne({ cedula: req.body.cedula, estado: true });

        if (pacienteN) {
            return res.status(404).json({ error: 'El paciente ya ha sido registrado' });
        }

        const paciente = new Paciente({ nombre, apellidos, cedula, peso_presion, edad, altura, enfermedades, tipoSangre, alergias, contactoEmergencia });

        const resultado = await Paciente.insertMany(paciente);



        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo POST",
                resultado
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const pacientePUT = async (req = request, res = response) => {

    try {

        const { nombre, apellidos, cedula, peso_presion, edad, altura, enfermedades,
            tipoSangre, alergias, contactoEmergencia } = req.body


        const pacienteN = await Paciente.findOne({ cedula: req.body.cedula, estado: true });

        if (!pacienteN) {
            return res.status(404).json({ error: 'No se encontró el paciente' });
        }


        const updated = await Paciente.updateOne(
            {
                cedula: cedula
            },
            {
                $set: {
                    nombre: nombre,
                    apellidos: apellidos,
                    edad: edad,
                    altura: altura,
                    tipoSangre: tipoSangre,
                    peso_presion: peso_presion,
                    enfermedades: enfermedades,
                    alergias: alergias,
                    contactoEmergencia: contactoEmergencia
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


const pacienteDELETE = async (req = request, res = response) => {

    try {
        const { cedula } = req.body;

        let user = "Paciente no existe"

        const validar = await Paciente.findOne({ cedula: cedula, estado: true })

        if (!validar) {
            return res.status(404).json({ error: 'El paciente no existe o ya a sido eliminado' });
        }

        user = await Paciente.updateOne({ cedula: cedula }, { $set: { estado: "false" } });


        res.json(
            {
                ok: 200,
                "msg": "Mensaje desde el metodo DELETE",
                user
            }
        );

    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo DELETE');
    }
}



module.exports = {
    pacienteGET,
    pacientePOST,
    pacientePUT,
    pacienteDELETE,
    pacienteGETAll
}