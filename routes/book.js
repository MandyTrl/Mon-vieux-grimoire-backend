const express = require('express') //import d'express
const router = express.Router() //création du router avec la méthode ".router()" fournie par Express
const bookControllers = require('../controllers/book.js') //export du controller "book"

//ajoute un livre à la BDD
router.post('/', bookControllers.addBook)

//récupére tous les livres de la BDD
router.get('/', bookControllers.getBooks)

//récupére un livre
router.get('/:id', bookControllers.searchBook)

//modifie un livre à la BDD
router.put('/:id', bookControllers.updateBook)

//supprime un livre à la BDD
router.delete('/:id', bookControllers.deleteBook)

//ajoute une notation à un livre à la BDD
router.put('/:id/rating', bookControllers.addNotation)

//renvoie le top 3 des livres les mieux évalués
router.get('/bestrating', bookControllers.top3)

module.exports = router //export du router
