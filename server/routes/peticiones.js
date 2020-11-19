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
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.clientid);


//configuracion de google



async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.clientid, 
    });
    const payload = ticket.getPayload();
  console.log(payload.name);
  console.log(payload.picture);
  console.log(payload.email);
 
  }
 


app.post('/google',(req,res)=>{
    let token=req.body.idtoken
    verify(token)
    res.json({
        token
    })

})
//crear usuario y guardarlo en BD 
app.post('/usuario',[verificarToken,verificarRole], (req, res)=> {

    CrearUsuarioBD(req, res)
})

//retorna usuarios activos en la BD
app.get('/usuario',verificarToken ,(req, res)=> {


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