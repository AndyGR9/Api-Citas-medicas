const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');
const { validarCita } = require('../middleware/validarCita');

const router = Router();


const { citasPOST, citasGET, citasDELETE, citasGETAll
} = require('../controllers/citas');
const { validarNOMedico } = require('../middleware/validarRol'); 
const { validarJWT } = require('../middleware/validateJWT');



router.post('/', [
    check('cedulaPaciente', 'La cedula del paciente es obligatoria').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('cedulaMedico', 'La cedula es obligatoria').not().isEmpty(),
    validate_fields], validarJWT, validarNOMedico, validarCita, citasPOST);

router.get('/', [
    check('idCita', 'El id de la cita es obligarorio').not().isEmpty(),
    validate_fields], validarJWT, validarNOMedico, citasGET);


router.get('/listaCitas', validarJWT, validarNOMedico, citasGETAll);

router.delete('/', [
    check('id', 'El id de la cita es obligatorio').not().isEmpty(),
    validate_fields], validarJWT, validarNOMedico, citasDELETE);

module.exports = router;