const express = require('express'); //inicializar express
const router = express.Router();
const { registerUser, loginUser, profileUser } = require('../controllers/userControllers') //importar los controladores
const { protect } = require('../middlewares/authMiddleware')

router.post('/', registerUser) //regsitrar un usuario, el segundo parámetro es el controlador
router.post('/login', loginUser) //loggear user
router.get('/profile', protect, profileUser) //traer los datos del usuario, con protect está protegido. Se pone en ese orden por orden de ejecución

module.exports = router;