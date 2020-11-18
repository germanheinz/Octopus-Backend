const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    try {
        const{email, password} = req.body;

        const userDB = await User.findOne({email});

        console.log(userDB.id);
        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'There is no User with this id'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);
        console.log(validPassword + 'ok');
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'There is no User with this id'
            });
        }

        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'faild'
        });
    }
}

module.exports = { login };