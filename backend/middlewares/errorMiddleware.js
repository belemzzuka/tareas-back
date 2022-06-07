const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 //si hay status code que lo regrese y sino que sea error 500

    res.status(statusCode) //devolver el codigo de statusCode

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack //si es produccion que no nos muestre el stack pero si es development que lo muestre para debugging
    })
}

module.exports = {
    errorHandler,
}