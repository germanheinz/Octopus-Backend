const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    id:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: false
    },
    img:{
        type: String
    },
    amount:{
        type: String
    }
});

// Change the way to visualize the Object
ProductSchema.method('toJSON', function(){
    const{__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Product', UserSchema);