const { request, response } = require('express');
const Citas = require('../models/citas');
const Logins = require('../models/login');
var bcrypt = require('bcryptjs');
const moment = require('moment/moment');


const usersGET = async (req = request, res = response) => {

    try {

        const rol = { "rol": "public", "google": true };


        //const {limit}=req.query;
        const users = await Usuario.find(rol);

        // const {id}=req.params
        // const {limit,page}=req.query;

        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                users
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

        const { nombre, apellido, telefono, fecha, hora, especialidad, medico } = req.body


        const cita = new Citas({ nombre, apellido, telefono, fecha, hora, especialidad, medico });

        cita.fecha = moment(fecha, "DD/MM/YYYY").toISOString()

        cita.hora = moment(hora, "HH:mm").toISOString()


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

const usersPUT = async (req = request, res = response) => {

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


const usersDELETE = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        let user = "Usuario no existe"

        const validar = await Usuario.findById(id)

        const { payload } = jwt.decode(token, { complete: true });
        user = await Usuario.findById(payload.id)

        if (validar.estado == "true") {
            user = await Usuario.updateOne({ _id: id }, { $set: { estado: "false" } });
            console.log("bien")
        } else {
            console.log("mal")
        }
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
    usersGET,
    citasPOST,
    usersPUT,
    usersDELETE
}