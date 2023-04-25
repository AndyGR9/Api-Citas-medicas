const { Router } = require("express");
const { check } = require('express-validator');
const { login, register, rolPUT, loginGET, googleSingIn } = require("../controllers/auth");
const { validate_fields } = require('../middleware/validation-field');
const { validarAdmin, validarRoles } = require('../middleware/validarRol');
const { validarJWT } = require("../middleware/validateJWT");

const router = Router();

router.get('/', loginGET);

router.post('/login', [
    check('email', 'Este email no es valido').isEmail(),
    check('password', 'El nombre es obligatorio').not().isEmpty(),
    validate_fields], login); 

router.post('/register', [
    check('email', 'Este email no es valido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validate_fields], register);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validate_fields],
    googleSingIn);

router.put('/changeRol',[
    check('email', 'Este email no es valido').isEmail(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    validate_fields], validarJWT, validarAdmin,validarRoles, rolPUT);

module.exports = router; 