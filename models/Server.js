const express=require('express');
require('dotenv').config();
const conectorMONGO=require('../database/mongo');
const cors = require('cors')
const bodyParser = require("body-parser")



class Server{
constructor(){
   this.app=express();
   this.port=process.env.PORT;
   this.auth='/api/auth'
   this.cita='/api/citas'
   this.paciente='/api/paciente'
   this.consultas='/api/consultas'
   this.medico='/api/medico'

   //invocamos nuestros metodos
   this.middleWares();
   this.routes(); 
   this.MongoDB();

}




listen(){
    this.app.listen(this.port,()=>{
        console.log(`El servidor esta corriendo en el puerto ${this.port}`);
    });
}


routes(){
this.app.use(this.auth,require('../routes/auth'));
this.app.use(this.cita,require('../routes/citas'));
this.app.use(this.paciente,require('../routes/pacientes'));
this.app.use(this.consultas,require('../routes/consultas'));
this.app.use(this.medico,require('../routes/medico'));
}

middleWares(){
    this.app.use(express.json());
    this.app.use(express.static('public'))
    this.app.use(cors())
    this.app.use(bodyParser.urlencoded({extended : true}))
    this.app.use(bodyParser.json())
}

MongoDB(){
    conectorMONGO();
}





}



module.exports=Server;