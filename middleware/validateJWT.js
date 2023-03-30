const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req=request,res=response,next)=>{

    const token = req.header('x-token');

    
    //Revisando si viene el token
    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'Token no valido'
        })
    }

    //Revisar si el token es valido 
    try {
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const {id}=payload;
        //cargarlo al req
        req.id=id

    } catch (err) {
        console.log(err);
        res.status(400).json({
            ok:false,
            msg: 'Error en el token'
            
        })

    }

    
    next()
    

}

module.exports = {validarJWT}