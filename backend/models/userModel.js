// MVC - Aquí creamos el modelo para usuarios

const mongoose = require('mongoose'); //inicializamos mongoose

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor ingresa un nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor ingresa un correo eléctronico válido'],
        unique : true // esto lo hace el identificador de la colección
    },
    password: {
        type: String,
        required: [true, 'Por favor ingresa una contraseña']
    }
},{
    timestamps: true,
})

module.exports = mongoose.model('users', userSchema)