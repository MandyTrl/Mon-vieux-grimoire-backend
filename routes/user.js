const express = require('express') //import d'express
const router = express.Router() //création du router avec la méthode ".router()" fournie par Express
const userControllers = require('../controllers/user.js') //export du controller "user"

//crée un nouvel utilisateur
router.post('/signup', userControllers.signUp)

//authentification de l'utilisateur
router.post('/login', userControllers.addUser)

module.exports = router //export du router
