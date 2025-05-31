const { Schema, model } = require('mongoose')


//Esta es la forma en como quiero que luzcan mis eventos
//Se pueden añadir camdos si se desea
const EventoSchema = Schema({
    
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,     //Esto le va a decir a mongoose que va a ser una referencia
        ref: 'Usuario',      //Esta es la forma en como se hace la referencia
        required: true
    }
    

})


//reescribiendo como el tojson queremos que funcione 
EventoSchema.method('toJSON', function(){

    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})


module.exports = model('Evento', EventoSchema)