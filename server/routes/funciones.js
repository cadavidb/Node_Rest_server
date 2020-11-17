//                                                 \\
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../mongoDB/models/usuario')

//                                                   \\



//funcion para encontrar usuarios en la base de datos
let FindUsersBD = (req, res) => {




    let inicio = Number(req.query.inicio || 0)

    let limite = Number(req.query.limite || 5)
        //filtro los usuarios activos
    Usuario.find({ estado: 'activo' },

            'nombre google correo ') //propiedades a mostrar

    .limit(limite).skip(inicio)

    .exec((err, userBD) => { 
       

     

     

        if (err) {
            res.statusCode(400).
            json({
                ok: false,
                err
            })
        }
        //contar cuantos usuarios existen (activos y desactivados)

        Usuario.countDocuments({ estado: 'activo' }, (err, c) => {
            if (err) {
                res.status(400).json({
                    ok: no,
                    err
                })
            }
           
           

            res.json({
                usuariosTotales: c,
                usuarios: userBD
            })
            
        })


    })

}


//crear usuario y guardarlo en la base de datos

let CrearUsuarioBD = (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        google: body.google,
        estado: body.estado
    })


    usuario.save(function(err) {

        if (err)
            return res.json(err);

        res.json(usuario)
        console.log('usuario guardado');
    });

}



//cambiar estado de un usuario (activo || desactivado)

let borrar = (req, res) => {
    let id = req.params.id;
    if (id.length<=5) {
        return res.json({
            warning:'debes poner un id valido'
        })
    }
 
    let body = _.pick(req.body, ['estado'])

    Usuario.findByIdAndUpdate(id, body, { new: true,  context: 'query',  useFindAndModify: false}, (err, userBD) => {
        if (err) {
            return res.send(err)
        }
        
        

        res.json({
            ok: true,
            user_desactivado: {
                nombre: userBD.nombre,
                correo: userBD.correo,
                estado_actual: userBD.estado
            }
        })
    })

}


//actualizar algun dato del usuario en la base de datos
let actualizarData = (req, res) => {

    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'correo', 'role', ])
    Usuario.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query',
        useFindAndModify: false
    }, (err, userBD) => {
        if (err) {
            return res.send(err)
        }


        res.json({
            ok: true,
            usuario: userBD
        })
    })
}

module.exports = {
    FindUsersBD,
    CrearUsuarioBD,
    borrar,
    actualizarData
}