const mongoose = require('mongoose');

const conectorMONGO=async()=>{
    try{
        mongoose.set('strictQuery',true)
        await mongoose.connect(process.env.MongoDB);   
        console.log('La conexion a mongo fue exitosa');
    }
   catch(err){
    console.log(err);
    throw new Error('Error en la conexion de datos');
    }

}

module.exports=conectorMONGO;