const Book = require('../models/book') //import du model "book"

//ajoute un livre à la BDD
exports.addBook = async (req, res) => {
	try {
		const bookFromFront = JSON.parse(req.body.book) //on parse notre réponse reçue sous format json

		delete bookFromFront.userId //sera modifié par le token d'authentification pour plus de sécurité

		//création du livre en modifiant le "userId" et l'"imageUrl"
		const book = new Book({
			...bookFromFront,
			userId: req.auth.userId, //on assigne le token d'authentification au userId
			imageUrl: `${req.protocol}://${req.get('host')}/images/${
				req.file.filename
			}`, //définit la nouvelle url
		})

		await book.save() //sauvegarde le livre en BDD

		res.status(201).json({
			message: 'Livre ajouté à la BDD !',
		})
	} catch (error) {
		console.error('Book (addBook) error : ', error)
		res.status(400).json({ error })
	}
}

//récupére tous les livres de la BDD
exports.getBooks = (req, res) => {
	Book.find() //va récupérer tous les livres de la BDD
		.then((books) => res.status(200).json(books)) //récupère la promesse pour afficher les livres sous un format json
		.catch((error) => res.status(400).json({ error }))
}

//récupére un livre via son "id"
exports.searchBook = (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then((bookFound) => res.status(200).json(bookFound)) //récupère la promesse pour afficher le livre sous un format json
		.catch((error) => res.status(400).json({ error }))
}

//modifie un livre à la BDD via son "id"
exports.updateBook = (req, res) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() =>
			res.status(200).json({ message: 'Le livre a bien été modifié !' })
		)
		.catch((error) => res.status(400).json({ error }))
}

//supprime un livre à la BDD via son "id"
exports.deleteBook = (req, res) => {
	Book.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Livre supprimé de la BDD !' }))
		.catch((error) => res.status(400).json({ error }))
}

//ajoute une notation à un livre à la BDD via son "id"
exports.addNotation = (req, res) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() =>
			res
				.status(200)
				.json({ message: 'La notation a bien été prise en compte !' })
		)
		.catch((error) => res.status(400).json({ error }))
}

//renvoie le top 3 des livres les mieux évalués
exports.top3 = (req, res) => {
	Book.find() //va récupérer tous les livres de la BDD
		.then((books) => res.status(200).json(books)) //récupère la promesse pour afficher les livres sous un format json
		.catch((error) => res.status(400).json({ error }))
}
