const {Router}=require('express');
const { check } = require('express-validator');
const {validate_fields}=require('../middleware/validation-field');

const router=Router();


const {detallesPOST, diagnosticoPOST, consultaGET, consultaGETAll }=require('../controllers/consultas');



router.post('/detalles',validate_fields,detallesPOST); 

router.post('/diagnostico',validate_fields,diagnosticoPOST);

router.get('/',consultaGET);

router.get('/lista',consultaGETAll);



module.exports=router;