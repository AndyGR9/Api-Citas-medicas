const { Router } = require('express');
const { check } = require('express-validator');
const { validate_fields } = require('../middleware/validation-field');

const router = Router();


const { medicoPOST, medicoGET, medicoGETAll, medicoDELETE
} = require('../controllers/medicos');
const { validarAdmin } = require('../middleware/validarRol');
const { validarJWT } = require('../middleware/validateJWT');



router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('especialidad', 'La especialidad es obligatoria').not().isEmpty(),
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    validate_fields], validarJWT, validarAdmin, medicoPOST);


router.get('/Listamedico', validarAdmin, medicoGETAll);

router.get('/', validarJWT, validarAdmin, medicoGET);

router.delete('/', [
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    validate_fields],validarJWT, validarAdmin,  medicoDELETE);

module.exports = router;