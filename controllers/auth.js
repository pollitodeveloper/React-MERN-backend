const { response } = require('express')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
// const { validationResult } = require('express-validator')

const crearUsuario = async( req, res = response ) => {

    // console.log( req.body );
    const { email, password } = req.body;

    /*if( name.length < 3 ) {
        return res.status(400).json({
            ok: false,
            msg: 'El nombre debe de tener por lo menos 3 letras'
        });
    }*/
    
    try {

        let usuario =  await Usuario.findOne({ email: email})   //Tambien se puede dejar solamente 'email'. Si el usuario no existe se regresa null
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            })
        }
        

        usuario = new Usuario( req.body );      //Le cae encima la nueva instancia


        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt ) 


        await usuario.save();

        //Generar JWT
        const token = await generarJWT( usuario.id, usuario.name )
        


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            // msg: 'registro',
            // user: req.body
            // name,
            // email,
            // password,
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}


const loginUsuario = async( req, res = response ) => {

    const { email, password } = req.body

    //Manejo de errores
    // const errors = validationResult( req );
    // if( !errors.isEmpty() ){
    //     return res.status(400).json({
    //         ok: false,
    //         errors: errors.mapped()
    //     })
    // }

    try {

        let usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: "El usuario no existe con ese email"
            })
        }


        //Confirmar las contraseñas
        const validPassword = bcrypt.compareSync( password, usuario.password )

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña incorrecta"
            })
        }


        //Generar nuestro JWT
        const token = generarJWT( usuario.id, usuario.name );

        return res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el administrador"
        })
        
        
    }

    // res.status(201).json({
    //     ok: true,
    //     msg: 'login',
    //     email,
    //     password
    // })

}


const revalidarToken = ( req, res = response ) => {

    // const uid = req.uid;
    // const name = req.name;
    const { uid, name } = req


    //Generar un nuevo token
    const token = generarJWT( uid, name );


    res.json({
        ok: true,
        uid,
        name,
        token
        // msg: 'renew'
    })

}


module.exports = {
    crearUsuario, loginUsuario, revalidarToken
}