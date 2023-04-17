const {Schema,model}=require('mongoose');

const SchemaMedico= new Schema({
nombre:{
    type:String,
    required:[true,'El campo nombre es requerido']
},

apellido:{
    type:String,
    required:[true,'El campo apellido es requerido']
},

cedula: {
  type: String,
  required: [true, 'El campo cedula es requerido']
},

email:{
    type:String,
    required:[true,'El campo email es requerido']
},

citasActivas:[{
  idCita: {
    type: String,
    required: true
  },
    fecha: {
      type: Date,
      required: true
    },
    hora: {
      type: Date,
      required: true
    }
  }],


especialidad:{
    type:String,
    required:[true,'El campo especialidad es requerido']
},


});


module.exports=model('medicos',SchemaMedico);