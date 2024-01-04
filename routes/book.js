const express = require('express') //import d'express
const router = express.Router() //création du router avec la méthode ".router()" fournie par Express
const bookControllers = require('../controllers/book.js') //export du controller "book"
const authMiddleware = require('../middleware/auth') //export du middleware d'auhtentification

//ajoute un livre à la BDD - besoin d'être authentifié
router.post('/', authMiddleware, bookControllers.addBook)

//récupére tous les livres de la BDD
router.get('/', bookControllers.getBooks)

//récupére un livre
router.get('/:id', bookControllers.searchBook)

//modifie un livre à la BDD - besoin d'être authentifié
router.put('/:id', authMiddleware, bookControllers.updateBook)

//supprime un livre à la BDD - besoin d'être authentifié
router.delete('/:id', authMiddleware, bookControllers.deleteBook)

//ajoute une notation à un livre à la BDD - besoin d'être authentifié
router.put('/:id/rating', authMiddleware, bookControllers.addNotation)

//renvoie le top 3 des livres les mieux évalués
router.get('/bestrating', bookControllers.top3)

module.exports = router //export du router
