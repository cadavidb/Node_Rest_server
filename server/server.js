//configuracion del servidor
require('../config/config');

//conexion a base de datos
require('./mongoDB/conexion')

//express
const express = require('express')
const app = express()

//



//manejo de rutas (get , post,put...)

const bodyParser = require('body-parser')

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(require('./routes/peticiones'))







//puerto de escucha para el servidor
app.listen(process.env.PORT, () => {
    console.log('servidor iniciado en el puerto ' + process.env.PORT);
})