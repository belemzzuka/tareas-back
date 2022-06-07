const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const users = require('../models/userModel')

const protect = asyncHandler (async(req, res, next) => {
    let token;

    // CUANDO LA FIRMA ES INVALIDA
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){ //En los headers, la cadena de texto de autorizacion empieza con Bearer
        try{
            //obtener el token del header (Bearer token)
            token = req.headers.authorization.split(' ')[1] // se hace un split porque la cadena es Bearer 7933khfs52kf, esto lo vuelve un array donde la posicion 0 es Bearer y la posicion 1 es el token

            //verificacion de la firma
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtención de info del usuario del token para que cualquier ruta/endpoint que use 'protect' tenga acceso a los datos de usuario
            req.user = await users.findById(decoded.id).select('-password') //buscar el usuario por ID que ya decodificó en la constante decoded. .select('-password') para que no pase el password

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }
    //CUANDO NO HAY TOKEN CREADO
    if(!token){
        res.status(401)
        throw new Error('Acceso No Autorizado, sin token')
    }
})

module.exports = {
    protect,
}