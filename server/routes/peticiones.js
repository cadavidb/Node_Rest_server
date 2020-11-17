const {login} = require('./login');
const express = require('express')
const  {verificarToken,verificarRole}= require('../middlewares/auth');

const app = express();

const {
    FindUsersBD,
    CrearUsuarioBD,
    borrar,
    actualizarData
} = require('./funciones');



//crear usuario y guardarlo en BD 
app.post('/usuario',[verificarRole], (req, res)=> {

    CrearUsuarioBD(req, res)
})

//retorna usuarios activos en la BD
app.get('/usuario',verificarToken,(req, res)=> {


      FindUsersBD(req, res)
    

})

//cambiar el estado de un usuario en la BD
app.delete('/usuario/:id',[verificarToken,verificarRole], function(req, res) {

    borrar(req, res)
})


//actualizar algun valor del usuario 
app.put('/usuario/:id',[verificarToken,verificarRole], function(req, res) {

    actualizarData(req, res)

})

//login del usuario
app.post('/login',(req,res)=>{
    login(req,res)
     
})

module.exports = app;