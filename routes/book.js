const express = require('express') //import d'express
const router = express.Router() //création du router avec la méthode ".router()" fournie par Express
const bookControllers = require('../controllers/book.js') //import du controller "book"
const authMiddleware = require('../middlewares/auth') //import du middleware d'"auhtentification"
const resizerImageMiddleware = require('../middlewares/resizing-img.js')
const multerSaveImagesMiddleware = require('../middlewares/multer-config') //import du middleware d'"enregistrement des images" grace à multer

//ajoute un livre à la BDD - auth requise - gestion des enregistrements des images
router.post(
	'/',
	authMiddleware,
	multerSaveImagesMiddleware,
	resizerImageMiddleware,
	bookControllers.addBook
)

//récupére tous les livres de la BDD
router.get('/', bookControllers.getBooks)

//renvoie le top 3 des livres les mieux évalués
router.get('/bestrating', bookControllers.getTop3)

//récupére un livre
router.get('/:id', bookControllers.searchBook)

//modifie un livre à la BDD - auth requise - gestion des enregistrements des images
router.put(
	'/:id',
	authMiddleware,
	multerSaveImagesMiddleware,
	resizerImageMiddleware,
	bookControllers.updateBook
)

//supprime un livre à la BDD - auth requise
router.delete('/:id', authMiddleware, bookControllers.deleteBook)

//ajoute une notation à un livre à la BDD - auth requise
router.put('/:id/rating', authMiddleware, bookControllers.addRating)

module.exports = router //export du router
