const {Router}=require('express');
const { check } = require('express-validator');
const {validate_fields}=require('../middleware/validation-field');
const { validarCita } = require('../middleware/validarHoraCita');

const router=Router();


const { citasPOST 
}=require('../controllers/citas');




router.post('/citas',validate_fields,validarCita,citasPOST); 

module.exports=router;