const {response} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const stripe = require('stripe')('sk_test_51HpFb4EMPE3A40nBzlQv0k0V5FhwpxOK46sugfWNRSs7bgQ4LVAxvmhUFiWl7tEfZrhxX02DhxsOKKomBjjLVpJx00sBPcJsKI');


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

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {
        const {name, email, picture} = await googleVerify(googleToken);

        const userDB = await User.findOne({email});
        let user;

        if(!userDB){      
            user = new User({
                name,
                email,
                password: ':)',
                img: picture,
                google: true
            });     
            /**
                ** CLIENT CREATOR
            **/
            const customer = await stripe.customers.create({
                description: '',
                name: user.name,
                email: user.email
            });
        
            const{ id } = customer;
            user.stripeId = id; 


        } else {
            user = userDB;
            user.google = true;
        }

        await user.save();
        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            msg: 'Google Sign-In',
            token
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrect',
        });     
    }

    

}

const updateToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );


    res.json({
        ok: true,
        token
    });

}

module.exports = { login, googleSignIn, updateToken };