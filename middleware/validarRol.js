const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const { use } = require("passport");
const login = require("../models/login");

const validarAdmin = async (req=request,res=response,next)=>{

    const token = req.header('token');

    try {
        const { payload } = jwt.decode(token, { complete: true });
        const user =  await login.findById(payload.id)
        if(user.rol.toString().toLowerCase() != "admin"){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no tiene permisos de administrador'
                
            });
        } 

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: 'Algo salio mal al validar rol' 
            
        });
    }
    
    next()
 


}

const validarEnfermera = async (req=request,res=response,next)=>{

    const token = req.header('token');

    try {
        const { payload } = jwt.decode(token, { complete: true });
        const user =  await login.findById(payload.id)
        if(!(user.rol.toString().toLowerCase() == "enfermera" || user.rol.toString().toLowerCase() == "admin")){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no tiene permisos necesarios para acceder a consultas'
                
            });
        } 

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: 'Algo salio mal al validar rol' 
            
        });
    }
    
    next()
 


}

const validarMedico = async (req=request,res=response,next)=>{

    const token = req.header('token');

    try {
        const { payload } = jwt.decode(token, { complete: true });
        const user =  await login.findById(payload.id)
        if(!(user.rol.toString().toLowerCase() == "medico" || user.rol.toString().toLowerCase() == "admin")){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no tiene permisos necesarios acceder a consultas'
                
            });
        } 

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: 'Algo salio mal al validar rol' 
            
        });
    }

    
    
    next()
 


}

const validarNOMedico = async (req=request,res=response,next)=>{

    const token = req.header('token');

    try {
        const { payload } = jwt.decode(token, { complete: true });
        const user =  await login.findById(payload.id)
        if(user.rol.toString().toLowerCase() == "medico"){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no tiene permisos necesarios acceder a consultas'
                
            });
        } 

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg: 'Algo salio mal al validar rol' 
            
        });
    }

    
    
    next()
 


}

module.exports = {
    validarAdmin,
    validarEnfermera,
    validarMedico,
    validarNOMedico
}
