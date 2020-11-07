//express
const express = require('express')
const app = express()
//body parser para extraer datos del url
const bodyParser = require('body-parser')


//configuracion global del servidor
require('../config/config');
const puerto=process.env.PORT;

//conexion a base de datos
require('./mongoDB/conexion')




//middlewares
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(require('./routes/peticiones'))




//puerto de escucha para el servidor
app.listen(puerto, () => {
    console.log('servidor iniciado en el puerto ' + puerto);
})