const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')


const validarJWT = ( req, res = response , next ) => {

    // Lo voy a pedir en los: 'x-token' ubicado en los headers
    const token = req.header('x-token');
    // console.log(token);

    if ( !token ){
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        })
    }


    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        // console.log(payload);

        req.uid = uid;
        req.name = name;
        
        
    } catch (error) {
        // console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
        
    }

    next();
    
}


module.exports = {
    validarJWT,
}