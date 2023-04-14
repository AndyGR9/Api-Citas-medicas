const {Router}=require('express');
const { check } = require('express-validator');
const {validate_fields}=require('../middleware/validation-field');
const { validarCita } = require('../middleware/validarHoraCita');

const router=Router();


const { citasPOST, citasGET, medicoGET, medicoGETAll 
}=require('../controllers/citas');



router.post('/',validate_fields,validarCita,citasPOST); 

router.get('/',citasGET); 
    
router.get('/Listamedico',medicoGETAll); 

router.get('/medico',medicoGET); 

module.exports=router;