const { request, response } = require("express");

const validarParametroNoVacio = (req=request,res=response, next) => {
    const  parametro  = req.params;
    if (!parametro ) {
      return res.status(400).json({ mensaje: 'Se necesita un parametro para realizar la consulta' });
    }
    next();
  };

  
module.exports = {validarParametroNoVacio}