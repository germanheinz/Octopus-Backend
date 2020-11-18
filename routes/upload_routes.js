const { Router } = require('express');
const { uploadFile, getFile } = require('../controllers/upload.controller');
const fileUpload = require('express-fileupload');
const router = Router();

// api/upload

// default options
router.use( fileUpload() );

router.put('/:type/:id', uploadFile);

router.get('/:type/:img', getFile);

module.exports = router;