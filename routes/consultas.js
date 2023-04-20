const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');

const router = Router();


const { detallesPOST, diagnosticoPOST, consultaGET, consultaGETAll, examenesPOST } = require('../controllers/consultas');
const { validarEnfermera, validarMedico } = require('../middleware/validarRol');
const { validarJWT } = require('../middleware/validateJWT');



router.post('/detalles', [
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    check('detallesPaciente', 'Los detalles del paciente son obligatorios').isArray(),
    check('detallesPaciente.*.presion', 'La presion es obligatoria').notEmpty(),
    check('detallesPaciente.*.peso', 'El peso  es obligatorio').notEmpty(),
    check('detallesPaciente.*.altura', 'La altura es obligatoria').notEmpty(),
    check('detallesPaciente.*.sintomas', 'Los sintomas son obligatorios').notEmpty(),
    validate_fields],validarJWT, validarEnfermera, detallesPOST);

router.post('/diagnostico', [
    check('cedula', 'La cedula es obligatoria').notEmpty(),
    check('id', 'El id de la consulta es obligatorio').notEmpty(),
    check('diagnostico', 'El diagnostico es obligatorio').isArray(),
    check('diagnostico.*.diagnostico', 'El diagnostico del paciente es obligatorio').notEmpty(),
    check('diagnostico.*.medicamentos', 'Los medicamentos asignados al paciente son obligatorios').notEmpty(),
    check('examenes', 'Los examenes son obligatorios').isArray(),
    check('examenes.*.tipo', 'El tipo de examen asignado es obligatorio').notEmpty(),
    validate_fields],validarJWT, validarMedico, diagnosticoPOST);

router.post('/examenes', [
    check('cedula', 'La cedula es obligatoria').notEmpty(),
    check('id', 'El id de la consulta es obligatorio').notEmpty(),
    check('examenes', 'Los examenes son obligatorios').isArray(),
    check('examenes.*.tipo', 'El tipo de examen asignado es obligatorio').notEmpty(),
    check('examenes.*.caracteristica', 'El la razón del examen es obligatoria').notEmpty(),
    validate_fields],validarJWT, validarMedico, examenesPOST);

router.get('/', [
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    validate_fields], consultaGET);

router.get('/lista', consultaGETAll);



module.exports = router;