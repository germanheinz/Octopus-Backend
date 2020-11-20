const { response } = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const stripe = require('stripe')('sk_test_51HpFb4EMPE3A40nBzlQv0k0V5FhwpxOK46sugfWNRSs7bgQ4LVAxvmhUFiWl7tEfZrhxX02DhxsOKKomBjjLVpJx00sBPcJsKI');


const getUsers = async(req, res) => {

    // GET OBJECTS BY PAGE
    const start = Number(req.query.start) || 0;
    
    // PROMISE ARRAY
    const [user, count] = await Promise.all([
        User.find({}, 'name email img')
        .skip(start)
        .limit(21),

        User.countDocuments()
    ])

    res.json({
        ok: true,
        user,
        count
    });
}


// Save - Create User
const createUser = async(req, res = response) => {

    const{ name, email, password} = req.body;

    
    try {
        const existEmail = await User.findOne({email});
        
        if(existEmail){
            return res.status(400).json({
                ok: false,
                msg: 'Email already registered'
            });
        }
        
       const user = new User(req.body);
       
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

        // Crypt password
        const salt    = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        const token = await generateJWT(user.id);

        await user.save();

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
    }
}


const updateUser = async(req, res = response) => {

    const uid = req.params.id;
    console.log(uid)

    try {
        const userDB = await User.findById(uid);

        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'There is no User with this id'
            });
        }
        const {password, google, email, ...fields} = req.body;

        if(userDB.email !== email){
            delete fields.email
        }else{
            const existEmail = await User.findOne({email});
            if(existEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Email already exist'
                });
            }
        }

        fields.email = email;
        const userUpdated = await User.findByIdAndUpdate(uid, fields);

        return res.json({
            ok: true,
            userUpdated
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to update'
        });
    }
}

const deleteUser = async(req, res = response) => {

    const uid = req.params.uid;
    console.log(req.params.uid);

    try {
        const userDB = await User.findById(uid);

        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'There is no User with this id'
            });
        }

        await User.findByIdAndDelete(uid);

        return res.json({
            ok: true,
            msg: 'User deleted'
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to update'
        });
    }
}

module.exports = { getUsers, createUser, updateUser, deleteUser }