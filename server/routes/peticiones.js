const express = require('express')
const app = express();

const {
    FindUsersBD,
    CrearUsuarioBD,
    borrar,
    actualizarData
} = require('./funciones');



//crear usuario y guardarlo en BD 
app.post('/usuario', function(req, res) {

    CrearUsuarioBD(req, res)
})

//retorna usuarios activos en la BD
app.get('/usuario', function(req, res) {

    FindUsersBD(req, res)
})

//cambiar el estado de un usuario en la BD
app.delete('/usuario/:id', function(req, res) {

    borrar(req, res)
})


//actualizar algun valor del usuario 
app.put('/usuario/:id', function(req, res) {

    actualizarData(req, res)

})



module.exports = app;