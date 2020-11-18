const jwt = require('jsonwebtoken');


const validateJWT = (req, res, next) => {

    const token = req.header('x-token');

    console.log(token);

    //verify token
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'no Token'
        });
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid Token'
        });
    }

}

module.exports = validateJWT