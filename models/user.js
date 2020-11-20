const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false,
        unique: false
    },
    password:{
        type: String,
        required: false
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: false,
        default: 'USER_ROLE'  
    },
    google:{
        type: Boolean,
        default: false
    },
    stripeId:{
        type: String,
    },
});

// Change the way to visualize the Object
UserSchema.method('toJSON', function(){
    const{__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})




module.exports = model('User', UserSchema);