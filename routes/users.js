const {Router}=require('express');
const { check } = require('express-validator');
const {validate_fields}=require('../middleware/validation-field');
const {validarJWT} = require('../middleware/validateJWT');
const {validarRol} = require('../middleware/validarRol');
const router=Router();


const { usersGET,
       usersPOST,
       usersPUT,
       usersDELETE
}=require('../controllers/users');


router.get('/',usersGET);


router.post('/',validate_fields,usersPOST); 



router.put('/:id',validarRol,usersPUT);


router.delete('/:id',validarJWT,validarRol,[
       check('id','ID no valido en mongo').isMongoId(),validate_fields], usersDELETE);

module.exports=router;





