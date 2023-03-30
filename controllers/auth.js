const { request, response } = require("express")
const logins = require('../models/login');
const bcrypt = require('bcryptjs');
const GenerarJWT = require("../helpers/generarWebToken");


const register = async (req = request, res = response) => {

    try {

        const { email, password, google, rol } = req.body
        const user = new logins({ email, password, google, rol });

        //Asignar rol por defecto
        user.rol = "public"

        //Llave o numero de vueltas
        var salt = bcrypt.genSaltSync(10);

        //Algoritmo de encriptado
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await GenerarJWT(logins.id)

        return res.status(200).json({
            ok: true,
            msg: "Estoy enviando desde el login",
            email,
            password,
            user,
            token
        });
    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo POST');
    }
}

const login = async (req = request, resp = response) => {

    const { email, password } = req.body;

    //validar email
    const login = await logins.findOne({ email });

    if (!login) {
        return resp.status(400).json({
            ok: false,
            msg: "Email no existe en la base de datos",
            email,
            password
        });
    }

    //validar contraseña
    const passwordValid = bcrypt.compareSync(password, login.password);
    if (!passwordValid) {
        return resp.status(400).json({
            ok: false,
            msg: "Password no existe en la base de datos",
            email,
            password
        });
    }

    //Valiar el jsonWebToken
    const token = await GenerarJWT(login.id)

    return resp.status(200).json({
        ok: true,
        msg: "Estoy enviando desde el login",
        email,
        password,
        token
    });
}

const rolPUT=async(req=request, res=response)=>{

    try {
    const {email,rol}=req.body;

    const updated= await logins.updateOne({email:email}, {$set: {rol:rol}});

        res.json(
            {
                ok:true,
                "msg":"Mensaje desde el metodo rolPUT",
                updated
            }
        );
    }
    catch(err){
        console.log(err);
        throw new Error('Error en el metodo rolPUT');
}
}


module.exports = { login, register, rolPUT }  