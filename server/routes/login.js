const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express()

const Usuario = require('../mongoDB/models/usuario')

let login=(req,res)=>{
  

    let body=req.body;

    Usuario.findOne({correo:body.correo},(err,usuarioR)=>{
 
     if (err) {
     return  res.
         json({
             ok: false,
             err
         })
     }
 
 
     if (!usuarioR) {
        return  res.
         json({
             ok: false,
             warning:{
                 message:'(usuario) o contraseña no encontrados'
             }
         })
     }
 if (!bcrypt.compareSync(body.password,usuarioR.password)) {
    return  res.
    json({
        ok: false,
        warning:{
            message:'usuario o contraseña no encontrados'
        }
    })
 }

 const token=jwt.sign({
    data: usuarioR
  }, process.env.semilla, { expiresIn: process.env.Vtoken});


     
 
     res.json({
         ok:true,
         usuarioLogeado:usuarioR,
         token
 
     })
 
    })
  





     

}




module.exports={
    app,
    login
};


