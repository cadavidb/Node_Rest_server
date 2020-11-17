const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['usuario', 'admin'],
    message: '{VALUE} no es un rol valido'
}


let estadosValidos = {
    values: ['activo', 'desactivado'],
    message: '{VALUE} no es un estado valido'
}

//definir esquema para los usuarios
let usuarioSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'el nombre es necesario'],
    },

    correo: {
        type: String,
        unique: true,
        required: [true, 'el correo es necesario'],
    },
    password: {
        type: String,
        required: [true, 'la contraseña es necesaria'],
    },

    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos

    },
    google: {
        type: Boolean,
    },
    estado: {
        type: String,
        default: 'activo',
        enum: estadosValidos
    }



})
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObjetc = user.toObject();
    delete userObjetc.password
    return userObjetc;
}
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico', role: 'rol por defecto' })

module.exports = mongoose.model('usuario', usuarioSchema);