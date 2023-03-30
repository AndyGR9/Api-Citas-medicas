const jwt = require('jsonwebtoken');


const GenerarJWT=(id='')=>{

    return new Promise((resolve, reject) =>{
        const payload ={id};

        const options={
            expiresIn:'4h'  
        }

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,
            options,(err,token)=>{
                if(err){ 
                    reject('No se pudo generar token')
                }else{
                    resolve(token) 
                }
            })
    });

}

module.exports = GenerarJWT;