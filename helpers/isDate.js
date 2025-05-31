const moment = require('moment')

const isDate = ( value ) => {

    if ( !value )    {
        return false;
    }


    const fecha = moment( value );      //No importa el tipo de valor, este se establece en moment y moment nos indicara si es una fecha correcta o no
    if( fecha.isValid() ){
        return true;
    } else {
        return false;
    }

}


module.exports = {
    isDate
}