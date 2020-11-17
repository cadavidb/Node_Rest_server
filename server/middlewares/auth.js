const jwt= require('jsonwebtoken');
//verificar token

let verificarToken=(req,res,next)=>{
    let token=req.get('token');
   jwt.verify(token,process.env.semilla,(err,data)=>{
      
  
       if (err) {
          return res.json({
               ok:false,
               warning:'token invalido'
           })
       }

    req.usuario=data.data
    next()

      
   })

}


//CREAR UN MIDDLEWARE

let verificarRole=(req,res,next)=>{
    let body = req.body.role;
    if (body==='admin') {
        next()
    }else{
       return res.json({
            ok:false,
            warning:'no tienes permiso para crear usuarios'
        })
    }


}


module.exports={
    verificarToken,
    verificarRole
};