const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');
const { validarCita } = require('../middleware/validarCita');

const router = Router();


const { citasPOST, citasGET, medicoGET, medicoGETAll, citasDELETE
} = require('../controllers/citas');



router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    validate_fields], validarCita, citasPOST);

router.get('/', citasGET);

router.get('/Listamedico', medicoGETAll);

router.get('/medico', [
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    validate_fields], medicoGET);

router.delete('/', [
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    check('id', 'El id de la cita es obligatorio').not().isEmpty(),
    validate_fields], citasDELETE);

module.exports = router;