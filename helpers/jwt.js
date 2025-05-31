const jwt = require('jsonwebtoken')

const generarJWT = ( uid, name ) => {   //Aca se obtienen el uid y el name

    const payload = { uid, name };

    const token = jwt.sign( payload, process.env.SECRET_JWT_SEED,{
        expiresIn: '2h'
    })

    if( !token ){
        return 'No se pudo generar el token'
    }

    return token;

    
    /* Error con esta forma de hacerlo */
    // return new Promise( ( resolve, reject ) => {    //Retorno una nueva promesa

    //     const payload = { uid, name }   //El payload es el uid y el nombre que se reciben de arriba

    //     jwt.sign( payload, process.env.SECRET_JWT_SEED, {   //Firma del objeto(el payload) y la palabra secreta con la cual se firmaran los token 
    //         expiresIn: '2h'

    //     }, ( err, token ) => {  //Cuando se firma(todo el proceso anterior) se llama este callback 

    //         if( err ) {     //Si no le logro generar el token se imprime en consola(el error)
    //             console.log(err);
    //             reject('No se pudo generar el token')
    //             // return 'No se pudo generar el token'
    //         };


    //         resolve( token );   //Si todo sale bien se obtiene el token
    //         // return token
    //     })


    // })

}


module.exports = {
    generarJWT
}