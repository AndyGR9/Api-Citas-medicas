const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const { use } = require("passport");
const login = require("../models/login");

const validarRol = async (req=request,res=response,next)=>{

    const token = req.header('x-token');
    
    

    try {
        const { payload } = jwt.decode(token, { complete: true });
        const user =  await login.findById(payload.id)
        console.log(user.rol)
        if(user.rol.toString().toLowerCase() != "admin"){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no tiene permisos necesarios para cambiar de roles'
                
            });
        } 

    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg: 'Algo salio mal al validar rol' 
            
        });
    }
    
    next()
 


}

module.exports = {validarRol}
