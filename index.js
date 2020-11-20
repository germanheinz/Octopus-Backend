require('dotenv').config();
const fileUpload = require('express-fileupload');
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');

const app = express();

// CONFIG CORS
app.use(cors());

app.use(express.json());

// DATABASE
dbConnection();

//PUBLIC DIRECTORY
app.use(express.static('public'));

app.use('/api/user', require('./routes/user_routes'));
app.use('/api/login', require('./routes/auth_routes'));
app.use('/api/upload', require('./routes/upload_routes'));

//STRIPE
app.use('/api/payment', require('./routes/stripe_routes'));


app.listen(process.env.PORT, () => {
    console.log('Server running in port ' + process.env.PORT);
});