const {Router}=require('express');
const { check } = require('express-validator');
const {validate_fields}=require('../middleware/validation-field');

const router=Router();


const { pacientePOST, pacienteGET, pacientePUT, pacienteDELETE, pacienteGETAll }=require('../controllers/paciente');



router.post('/',validate_fields,pacientePOST); 

router.get('/',pacienteGET);

router.get('/listaPacientes',pacienteGETAll);

router.put('/',validate_fields,pacientePUT);

router.delete('/',pacienteDELETE);

module.exports=router;