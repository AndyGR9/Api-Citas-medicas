const express=require('express');
require('dotenv').config();
const conectorMONGO=require('../database/mongo');



class Server{
constructor(){
   this.app=express();
   this.port=process.env.PORT;
   this.usersPath='/api/users'
   this.auth='/api/auth'
   this.cita='/api/citas'


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
this.app.use(this.usersPath,require('../routes/users'));
this.app.use(this.auth,require('../routes/auth'));
this.app.use(this.cita,require('../routes/citas'));
}

middleWares(){
    this.app.use(express.json());
    this.app.use(express.static('public'))
}

MongoDB(){
    conectorMONGO();
}





}



module.exports=Server;