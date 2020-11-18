const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_URL_CONNECTION, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online')

    } catch (error) {
        console.log("Error to connect Data Base");
        throw new Error('Error to connect Data Base');
    }
}

module.exports = {
    dbConnection
}