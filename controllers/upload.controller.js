const {response}     = require('express');
const path           = require('path');
const updateImage    = require('../helpers/updateImage');
const { v4: uuidv4 } = require('uuid');
const fs             = require('fs');


const uploadFile = async(req, res = response) => {

    const type = req.params.type;
    const id   = req.params.id;

    const validTypes = ['users']

    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'Invalid Type'
        });
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const file = req.files.image;


    const nameShorter = file.name.split('.');
    const fileExtensions = nameShorter[nameShorter.length - 1];

    const validExtensions = ['png','jpg','jpeg','gif'];

    if(!validExtensions.includes(fileExtensions)){
        return res.status(400).json({
            ok: false,
            msg: 'Invalid Type'
        });
    }

    const fileName = `${ uuidv4() }.${fileExtensions}`;

    const path = `./uploads/${ type }/${ fileName }`;

    file.mv(path, (err) => {
        if (err){
          return res.status(500).json({
            ok: false,
            msg: 'Error to replace file'
          });
        }
    });

    updateImage(type, id, fileName);

    res.json({
        ok: true,
        msg: 'File uploaded',
        fileName
    });   
}

const getFile = (req, res) => {

    const type = req.params.type;
    const img  = req.params.img;

    console.log( ' ***** '+ type + img);

    const pathImg = path.join( __dirname, `../uploads/${type}/${img}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.png`);
        res.sendFile(pathImg);
    }
}

module.exports = { uploadFile, getFile }