const {Router}=require('express');
const { check } = require('express-validator');
const {validate_fields}=require('../middleware/validation-field');

const router=Router();


const { citasPOST 
}=require('../controllers/citas');



router.post('/',validate_fields,citasPOST); 

module.exports=router;