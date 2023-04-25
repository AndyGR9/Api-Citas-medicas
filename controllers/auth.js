const { request, response } = require("express")
const logins = require('../models/login');
const bcrypt = require('bcryptjs');
const GenerarJWT = require("../helpers/generarWebToken");
const { googleVerify } = require('../helpers/googleVerify');

const loginGET = async (req = request, res = response) => {

    try {

        const loginsLista = await logins.find();

        res.status(200).json(
            {
                "msg": "Mensaje desde el metodo GET",
                loginsLista
            }
        );




    }
    catch (err) {
        console.log(err);
        throw new Error('Error en el metodo GET');
    }
}

const register = async (req = request, res = response) => {

    try {

        const { email, password, google, rol } = req.body
        const user = new logins({ email, password, google, rol });

        const resgistro = await logins.findOne({ email });

         if (resgistro) {
        return res.status(400).json({
            ok: false,
            msg: "El usuario  existe en la base de datos",
            email
        });
    }


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
        throw new Error('Error en el metodo Registro');
    }
}

const login = async (req = request, resp = response) => {

    try {
        const { email, password } = req.body;

    //validar email
    const login = await logins.findOne({ email });

    if (!login) {
        return resp.status(400).json({
            ok: false,
            msg: "Email no existe en la base de datos",
        });
    }

    //validar contraseña
    const passwordValid = bcrypt.compareSync(password, login.password);
    if (!passwordValid) {
        return resp.status(400).json({
            ok: false,
            msg: "Contraseña incorrecta",
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
    } catch (err) {
        console.log(err);
        throw new Error('Error en el metodo login');
    }

    
}

const googleSingIn=async(req=request, res=response )=>{

    const {id_token}=req.body;
      
    try{
       //Capturamos el usuario que esta solicitango logueo
       const googleUser= await googleVerify(id_token);
   
       //Tercer paso desestructurar y grabar en nuestra aplicacion 
       //el usuario que se logueo en google
       const  {name, email, picture}=googleUser;
      
       //Cuarto paso Generar la referencia para saber si el usuario ya existe
   
       let usuario= await logins.findOne({email});
   
       if(!usuario){
       const data={
           name:name,
           email: email,
           //El hash se le delega a google 
           password:'p',
           google:true,
           rol:'Public'}
       usuario= new logins(data);
       await usuario.save();
       }
   
   
     //Generamos el JsonWebToken
   const token= await GenerarJWT(usuario.id);
     
     
       //Configuramos la salida 
       res.status(200).json({
         msg:'Todo bien desde googleSignIn',
        /* 
        Esto va primero y tras hacer la validacion lo borramos para 
        solo devolver el usuario y el token 
         id_token,
         googleUser
        */
       usuario,
       token
   
       });
  
       console.log('Creacion correcta del usuario en google')
   
      }
     catch(err){
       console.log(err)
     res.status(400).json({
       ok:false,
       msg:'El token no se pudo verificar. Intentar con otro'
     });
     }
      
   
   
   }
    

const rolPUT=async(req=request, res=response)=>{

    try {
    const {email,rol}=req.body;

    const login = await logins.findOne({ email });

    if (!login) {
        return res.status(400).json({
            ok: false,
            msg: "Email no existe en la base de datos"
        });
    }


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


module.exports = {loginGET, login, register, rolPUT, googleSingIn }  