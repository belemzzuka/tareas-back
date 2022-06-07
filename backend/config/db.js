const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) //conectar con la URI de la DB
        console.log(`Conexión a MongoDB exitosa ${conn.connection.host}`)
    } catch (error) {
        console.log('Hubo un error: ')
        process.exit(1) //detener el programa
    }
}

module.exports = connectDB //exportar la conexion a la DB