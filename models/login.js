const {Schema,model}=require('mongoose');

const SchemaLogin= new Schema({


password:{
    type:String,
    required:[true,'El campo password es requerido']
},

email:{
    type:String,
    required:[true,'El campo email es requerido']
},

google:{
    type:Boolean,
    default:false
},

rol:{
    type:String,
    default:"Public"
},

});



module.exports=model('login',SchemaLogin);

