const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const validateObject = require('../middlewares/validate-object');

const router = Router();

//api/login
router.post('/', [
    check('email','email required').isEmail(),
    check('password','password required').not().isEmpty(),
    validateObject
], login);

module.exports = router;