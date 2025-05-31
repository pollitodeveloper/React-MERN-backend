const { Schema, model } = require('mongoose')

//Esta es la forma en como quiero que luzcan mis usuarios
//Se pueden añadir mas campos si se desea
const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('Usuario', UsuarioSchema)