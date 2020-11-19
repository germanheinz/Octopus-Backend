const { Router } = require('express');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { check } = require('express-validator');
const validateObject  = require('../middlewares/validate-object');
const validateJWT = require('../middlewares/validate-jwt');

// api/user

const router = Router();

router.get('/', validateJWT, getUsers);

// Adding Middleware in second param
router.post('/', [
    check('name', 'name required').not().isEmpty(),
    check('email', 'Please, write a correct email').isEmail(),
    check('password', 'name required').not().isEmpty(),
], createUser);

router.put('/:uid', [
    validateJWT,
    check('name', 'name required').not().isEmpty(),
    check('email', 'Please, write a correct email').isEmail(),
    check('password', 'name required').not().isEmpty(),
    validateObject
], updateUser);

router.delete('/:uid', validateJWT, deleteUser);

module.exports = router;