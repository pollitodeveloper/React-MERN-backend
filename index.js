const path = require('path');

const express = require('express')
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// console.log( process.env );

//Crear el servidor de express
const app = express();


//Base de datos
dbConnection();


//CORS
app.use(cors());


//Directorio publico
app.use( express.static('public'));


//Lectura y parseo del body
app.use( express.json() );      //Las peticiones que vengan en formato JSON las procesare y extraere su contenido 


//Rutas
//TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth') )
app.use('/api/events', require('./routes/events') )


app.use( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'public/index.html' ) );
} );

//TODO: CRUD: Eventos
//Escuchar las peticiones
app.listen( process.env.PORT, () => {   //Primero es el cuerto(cualquier puerto). El segundo se ejecuta cuando el servidor de express este arriba
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
} );