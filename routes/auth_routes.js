const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, updateToken } = require('../controllers/auth.controller');
const validateJWT = require('../middlewares/validate-jwt');
const validateObject = require('../middlewares/validate-object');

const router = Router();

//api/login
router.post('/', [
    check('email','email required').isEmail(),
    check('password','password required').not().isEmpty(),
    validateObject
], login);

//api/login
router.post('/google', [
    check('token','Token required').not().isEmpty(),
    validateObject
], googleSignIn);

router.get('/updateToken', [ updateToken, validateJWT ]);


module.exports = router;