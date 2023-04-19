const {Router}=require("express");
const { check } = require('express-validator');
const { login,register,rolPUT, loginGET } = require("../controllers/auth");
const {validate_fields}=require('../middleware/validation-field');
const {validarAdmin} = require('../middleware/validarRol');
const { validarJWT } = require("../middleware/validateJWT");

const router=Router();

router.get('/',loginGET);

router.post('/login',[
check('email','Este email no es valido').isEmail(),
check('password','El nombre es obligatorio').not().isEmpty(),
validate_fields],
login); 

router.post('/register',[
    check('email','Este email no es valido').isEmail(),
    check('password','El nombre es obligatorio').not().isEmpty(),
    validate_fields],register); 
    
router.put('/changeRol',validarJWT,validarAdmin,rolPUT);

module.exports=router; 