const {login} = require('./login');
const jwt = require('jsonwebtoken');
const express = require('express')
const  {verificarToken,verificarRole}= require('../middlewares/auth');
const Usuario = require('../mongoDB/models/usuario')

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
  return {
      nombre:payload.name,
      img:payload.picture,
      correo:payload.email,
      google:true
  }
 
  }
 


app.post('/google',async(req,res)=>{
let token=req.body.idtoken;
let userGoogle= await verify(token).catch(err=>{
    return res.status(500).json({
        ok:false,
        err
    })
})

Usuario.findOne({correo:userGoogle.correo},(err,usuarioDB)=>{
    if (err) {
        return res.status(500).json({
            ok:false,
            err
        })
    }
    if (usuarioDB) {
        if (usuarioDB.google===false) {
            return res.status(400).json({
                ok:false,
                err:{
                    message:'debe usar autenticacion normal'
                }
            })
        }else{
            
            const token=jwt.sign({data: userGoogle }, process.env.semilla, { expiresIn: process.env.Vtoken});
            return res.json({
                ok:true,
                usuario:usuarioDB,
                token
            })

        }
        
    }else{

        let user=new Usuario();
        user.nombre=userGoogle.nombre
        user.img=userGoogle.img
        user.correo=userGoogle.correo
        user.google=userGoogle.google
        user.password=':)'
        user.save((err,succes)=>{
            if (err) {
                return res.json({
                    ok:false,
                    err
                })
            }

        })            
                  
        return res.json({
            ok:true,
            usuario:usuarioDB,
            token
        })
                      
    }
             
})



//    let usuarioGoogle= await  verify(token) 
//    .catch(err=>{
//       return res.json({
//           ok:false,
//           err:err
//         }) 
//     }).then()

//    return res.json({
//        user:usuarioGoogle

//    })
//      Usuario.findOne({email:data.email},(err,usuario)=>{
      
//             if (err) {
//                 return res.status(500).json({
//                     ok:false,
//                     err
//                 })
//             }
      
//             if (usuario) {
//                 if (usuario.google===false) {
//                   return res.status(400).json({
//                       ok:false,
//                       err:{
//                           message:'debe autenticarse de manera normal'
//                       }
//                   })
//                 }else{
//                   const token=jwt.sign({
//                       data: usuario
//                     }, process.env.semilla, { expiresIn: process.env.Vtoken});
          
          
//                     return res.json({
//                         ok:true,
//                         usuario,
//                         token
//                     })
      
//                 }
//             }else{
      
//               //si el usuario no existe en nuestra base de datos
      
//               let user=new Usuario();
//               user.nombre=data.nombre
//               user.img=data.img
//               user.correo=data.correo
//               user.google=data.google
//               user.password=':)'
//           user.save((err,save)=>{
//               if (err) {
//                   return res.status(500).json({
//                       ok:false,
//                       err
//                   })
//               }

//               console.log('usuario autenticado por google');
      
      
      
//               const token=jwt.sign({
//                   data: usuario
//                 }, process.env.semilla, { expiresIn: process.env.Vtoken});
      
      
//                 return res.json({
//                     ok:true,
//                     usuario,
//                     token
//                 })
      
      
      
//           })
              
      
      
//             }
      
      
      
      
      
      
//         })







        
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