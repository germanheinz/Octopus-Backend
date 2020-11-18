const User = require('../models/user');
const fs   = require('fs');


const updateImage = async(type, id, fileName) => {
    console.log(type + 'AQUI' + id);
    switch (type) {
        case 'users':
            const user = await User.findById(id);
            if( !user ){
                return false;
            }

            const oldPath = `./uploads/users/${user.id}`;
            if(fs.existsSync(oldPath)){
                fs.unlinkSync(oldPath);
            }
            
            user.name = fileName;
            
            await user.save();

            return true;

            break;
    
        default:
            break;
    }


}

module.exports = updateImage