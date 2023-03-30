const {request, response}=require('express');
const Usuario=require('../models/users')
var bcrypt = require('bcryptjs');


const usersGET=async(req=request, res=response)=>{

    try {

       const rol={"rol":"public","google":true};
      

        //const {limit}=req.query;
        const users = await Usuario.find(rol);

        // const {id}=req.params
        // const {limit,page}=req.query;

        res.status(200).json(
            {
                "msg":"Mensaje desde el metodo GET",
                users
            }
        );




    }
    catch(err){
        console.log(err);
        throw new Error('Error en el metodo GET');
}
}

const usersPOST=async(req=request, res=response)=>{

        try {
        
    const {name,email,password,google,rol,estado}=req.body
    const user= new Usuario({name,email,password,google,rol,estado});

    //Llave o numero de vueltas
    var salt = bcrypt.genSaltSync(10);
    //Algoritmo de encriptado
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
     
            res.json(
                {
                    ok:200,
                    "msg":"Mensaje desde el metodo POST",
                    user
                }
            );

        }
        catch(err){
            console.log(err);
            throw new Error('Error en el metodo POST');
}
}

const usersPUT=async(req=request, res=response)=>{

    try {
     const {id}=req.params;


    // 
    const {password,google, ...resto}=req.body;

    if(password){
        const salt=bcrypt.genSaltSync();
        resto.password=bcrypt.hashSync(password,salt);
    }

    const updated= await Usuario.findByIdAndUpdate(id,resto);
        res.json(
            {
                ok:200,
                "msg":"Mensaje desde el metodo PUT",
                updated
            }
        );
    }
    catch(err){
        console.log(err);
        throw new Error('Error en el metodo PUT');
}
}


const usersDELETE=async(req=request, res=response)=>{

    try {
       const {id}=req.params;

        let user="Usuario no existe"

       const validar = await Usuario.findById(id)

       const { payload } = jwt.decode(token, { complete: true });
        user = await Usuario.findById(payload.id)
        
       if(validar.estado == "true"){
            user= await Usuario.updateOne({ _id: id }, { $set: { estado: "false" } });
            console.log("bien")
       }else{
        console.log("mal")
       }
        res.json(
            {
                ok:200,
                "msg":"Mensaje desde el metodo DELETE",
                user
            }
        );

    }
    catch(err){
        console.log(err);
        throw new Error('Error en el metodo DELETE');
}
}



module.exports={
    usersGET,
    usersPOST,
    usersPUT,
    usersDELETE
}