const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');

const router = Router();


const { pacientePOST, pacienteGET, pacientePUT, pacienteDELETE, pacienteGETAll } = require('../controllers/paciente');
const { validarMedico } = require('../middleware/validarRol');



router.post('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellidos', 'El apellido es obligatorio').notEmpty(),
    check('cedula', 'La cedula es obligatoria').notEmpty(),
    check('peso_presion', 'El los datos de peso y presion son obligatorios').isArray(),
    check('peso_presion.*.peso', 'El peso es obligatorio').notEmpty(),
    check('peso_presion.*.presion', 'La presion es obligatoria').notEmpty(),
    check('edad', 'La edad es obligatoria').notEmpty(),
    check('altura', 'La altura es obligatoria').notEmpty(),
    check('enfermedades', 'Los tipos de enfermedades son obligatorios').isArray(),
    check('enfermedades.*.tipo', 'El tipo de enfermedad es obligatorio').notEmpty(),
    check('tipoSangre', 'El tipoSangre es obligatori').notEmpty(),
    check('alergias', 'Las alergias que padese son obligatorias').isArray(),
    check('alergias.*.medicamento', 'El medicamento al que tiene alergia es obligatorio').notEmpty(),
    check('contactoEmergencia', 'Los datos de los contactos de emergencias son obligatorios').isArray(),
    check('contactoEmergencia.*.nombre', 'El nombre del contacto de emergencia es obligatorio').notEmpty(),
    check('contactoEmergencia.*.apellidos', 'El apellido del contacto de emergencia es obligatorio').notEmpty(),
    check('contactoEmergencia.*.relacionFamiliar', 'La relacion familiar del contacto de emergencia es obligatoria').notEmpty(),
    check('contactoEmergencia.*.telefono', 'El numero de telefono del contacto de emergencia es obligatorio').notEmpty(),
    check('contactoEmergencia.*.direccion', 'La direcion del contacto de emergencia es obligatorio').notEmpty(),
    validate_fields], validarMedico, pacientePOST);


router.get('/', [
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    validate_fields], pacienteGET);

router.get('/listaPacientes', pacienteGETAll);

router.put('/', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellidos', 'El apellido es obligatorio').notEmpty(),
    check('cedula', 'La cedula es obligatoria').notEmpty(),
    check('peso_presion', 'El los datos de peso y presion son obligatorios').isArray(),
    check('peso_presion.*.peso', 'El peso es obligatorio').notEmpty(),
    check('peso_presion.*.presion', 'La presion es obligatoria').notEmpty(),
    check('edad', 'La edad es obligatoria').notEmpty(),
    check('altura', 'La altura es obligatoria').notEmpty(),
    check('enfermedades', 'Los tipos de enfermedades son obligatorios').isArray(),
    check('enfermedades.*.tipo', 'El tipo de enfermedad es obligatorio').notEmpty(),
    check('tipoSangre', 'El tipoSangre es obligatori').notEmpty(),
    check('alergias', 'Las alergias que padese son obligatorias').isArray(),
    check('alergias.*.medicamento', 'El medicamento al que tiene alergia es obligatorio').notEmpty(),
    check('contactoEmergencia', 'Los datos de los contactos de emergencias son obligatorios').isArray(),
    check('contactoEmergencia.*.nombre', 'El nombre del contacto de emergencia es obligatorio').notEmpty(),
    check('contactoEmergencia.*.apellidos', 'El apellido del contacto de emergencia es obligatorio').notEmpty(),
    check('contactoEmergencia.*.relacionFamiliar', 'La relacion familiar del contacto de emergencia es obligatoria').notEmpty(),
    check('contactoEmergencia.*.telefono', 'El numero de telefono del contacto de emergencia es obligatorio').notEmpty(),
    check('contactoEmergencia.*.direccion', 'La direcion del contacto de emergencia es obligatorio').notEmpty(),
    validate_fields], validarMedico, pacientePUT);

router.delete('/', [
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    validate_fields], validarMedico, pacienteDELETE);

module.exports = router;