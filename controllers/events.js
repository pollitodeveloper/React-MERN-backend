const { response } = require('express')
const Evento = require('../models/Evento')
// const bcrypt = require('bcryptjs')


const getEventos = async( req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name')
    
    //nota: esta es la forma en como se manda al backend(fijarse que los eventos se envian como 'eventos')
    res.json({
        ok: true,
        eventos
        // msg:'getEventos'
    })

}
//Todas las peticiones regresan eso
// {
//     ok: true,
//     msg: 'getEventos(obtener eventos)'
// }


const crearEvento = async( req, res = response) => {

    // console.log( req.body );     //Con esto verificamos que venga la informacion

    const evento = new Evento( req.body )

    try {

        evento.user = req.uid;      //Aca obtenemos el id del usuario
        
        const eventoGuardado = await evento.save()
        console.log( eventoGuardado);
        

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    // res.json({
    //     ok: true,
    //     msg: 'Crear evento'
    // })

}
//Todas las peticiones regresan eso
// {
//     ok: true,
//     msg: 'Crear evento'
// }


const actualizarEvento = async( req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );    //Usando el modelo de momgoose

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de editar este evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid       //No viene en la peticion del usuario, por eso se coloca aqui
        }


        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } )

        res.json({
            ok: true,
            evento: eventoActualizado

        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
    }


    // res.json({
    //     ok: true,
    //     eventoId
    //     // msg: 'Actualizar evento'
    // })


}
//Todas las peticiones regresan eso
// {    /138723
//     ok: true,
//     msg: 'Actualizar evento'
// }


const eliminarEvento = async( req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoId );    //Usando el modelo de momgoose

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if ( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de eliminar este evento"
            })
        }


        await Evento.findByIdAndDelete( eventoId )

        res.json({
            ok: true,
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Hable con el administrador'
        })
    }

    // const evento = 

    // res.json({
    //     ok: true,
    //     msg: 'Eliminar evento'
    // })


}
//Todas las peticiones regresan eso
// {    /1231212
//     ok: true,
//     msg: 'Eliminar evento'
// }


module.exports = {
    actualizarEvento,
    crearEvento,
    eliminarEvento,
    getEventos
}