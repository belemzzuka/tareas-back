//MVC - CONTROLLER
const asyncHandler = require('express-async-handler'); //inicializar el async handler

const Tarea = require('../models/tareaModel')

// Como vamos a trabajar con mongoose y devuelve promesas, los request deben ir con async y await
const getTareas = asyncHandler (async(req, res) => {
    const tareas = await Tarea.find({ user: req.user.id }) //devolver todas las tareas buscando a el user ID
    res.status(200).json(tareas)
})

const postTareas = asyncHandler (async(req, res) => {
    if(!req.body.text){
        // res.status(400).json({ message: 'Es obligatorio agregar una tarea' }) // Manda un mensaje en la consola
        res.status(400)
        throw new Error('Es obligatorio agregar una tarea')
    }
    const tarea = await Tarea.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(tarea)
})

const putTareas = asyncHandler (async(req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){ //Verificacion si existe la tarea
        res.status(400)
        throw new Error('TAREA NO ENCONTRADA')
    }

    if(tarea.user.toString() !== req.user.id){ //Verificacion si el user de la tarea encontrada es diferente al user del protect
        res.status(401)
        throw new Error('Acceso No Autorizado')
    }

    const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id,req.body, { //primer parametro cual registro vamos a modificar (id) y el segundo es que vamos a modificar (body)
        new: true, // si es true, manda en la respuesta el objeto despues de ser actualizado. Si es false, manda en la respuesta como estaba antes de ser actualizado
        upsert: true // si no existe, lo crea
    }) 
    res.status(200).json(tareaUpdated)
})

const deleteTareas = asyncHandler (async(req, res) => {
    const tarea = await Tarea.findById(req.params.id)
    if(!tarea){
        res.status(400)
        throw new Error('TAREA NO ENCONTRADA')
    }

    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Acceso No Autorizado')
    }

    await tarea.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTareas, //exportar getTareas
    postTareas,
    putTareas,
    deleteTareas
}