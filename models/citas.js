const {Schema,model}=require('mongoose');

const SchemaCitas= new Schema({
nombre:{
    type:String,
    required:[true,'El campo nombre es requerido']
},

apellido:{
    type:String,
    required:[true,'El campo apellido es requerido']
},

telefono:{
    type:String,
    required:[true,'El campo telefono es requerido']
},

fecha:{
    type:Date,
    default:[true,'El campo fecha es requerido']
},

especialidad:{
    type:String,
    required:[true,'El campo especialidad es requerido']
},

medico:{
    type:String,
    required:[true,'El campo medico es requerido']
}

});



module.exports=model('citas',SchemaCitas);