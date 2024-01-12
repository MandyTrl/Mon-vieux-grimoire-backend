const Book = require('../models/book') //import du model "book"
const fs = require('fs') //import du module fs de node pour la gestion des fichiers
const chalk = require('chalk') //import de la librairie "chalk" pour la personnalisation des logs

//ajoute un livre à la BDD
exports.addBook = async (req, res) => {
	try {
		const bookFromFront = JSON.parse(req.body.book) //on parse notre réponse reçue sous format json

		delete bookFromFront.userId //sera modifié par le token d'authentification pour plus de sécurité

		//création du livre en modifiant le "userId" et l'"imageUrl"
		const book = new Book({
			...bookFromFront,
			userId: req.auth.userId, //on assigne le token d'authentification au userId
			imageUrl: `${req.protocol}://${req.get(
				'host'
			)}/images/resized-${req.file.filename.replace(/\.[^.]*$/, '')}.webp`, //définit la nouvelle url
		})

		await book.save() //sauvegarde le livre en BDD

		res.status(201).json({
			message: 'Livre ajouté à la BDD !',
		})
	} catch (error) {
		res.status(400).json({ error })
		console.error(
			chalk.bold('|', chalk.red('!'), '|') +
				'Book ' +
				chalk.underline('addBook') +
				' error : ',
			error
		)
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
exports.updateBook = (req, res, next) => {
	//si l'on récupère un fichier alors on parse l'objet en modifiant l'url, sinon on récupère le corps de la requête sans le modifier
	const bookFromFront = req.file
		? {
				...JSON.parse(req.body.book), //on parse notre réponse reçue sous format json et on définit la nouvelle url
				imageUrl: `${req.protocol}://${req.get(
					'host'
				)}/images/resized-${req.file.filename.replace(/\.[^.]*$/, '')}.webp`,
		  }
		: { ...req.body }

	delete bookFromFront.userId //supprime l'userId venant de la requête - pas besoin d'être mis à jour + sécurité pour ne pas renvoyer un mauvais userId

	Book.findOne({ _id: req.params.id })
		.then((bookFound) => {
			//avant de modifier un livre on vérifie si le userId en BDD est différent de celui envoyé par le token dans le corps de la requête
			if (bookFound.userId !== req.auth.userId) {
				res.status(401).json({ message: 'Non authorisé' })
			} else {
				if (req.file) {
					const oldFileName = bookFound.imageUrl.split('/images/')[1] //récupère le chemin de l'image

					//pour le supprimer
					fs.unlink(`images/${oldFileName}`, (error) => {
						if (error) {
							console.error(
								chalk.bold('|', chalk.red('!'), '|') +
									"Erreur lors de la suppression de l'image :",
								error
							)
						}
						Book.updateOne(
							{ _id: req.params.id },
							{ ...bookFromFront, _id: req.params.id }
						)
							.then(() => {
								res
									.status(200)
									.json({ message: 'Le livre a bien été modifié !' })
							})
							.catch((error) => res.status(400).json({ error }))
					})
				} else {
					Book.updateOne(
						{ _id: req.params.id },
						{ ...bookFromFront, _id: req.params.id }
					)
						.then(() => {
							res.status(200).json({ message: 'Le livre a bien été modifié !' })
						})
						.catch((error) => res.status(400).json({ error }))
				}
			}
		})
		.catch((error) => res.status(400).json({ error }))
}

//supprime un livre à la BDD via son "id"
exports.deleteBook = (req, res) => {
	Book.findOne({ _id: req.params.id })
		.then((bookFound) => {
			//avant de supprimer un livre on vérifie si le userId en BDD est différent de celui envoyé par le token dans le corps de la requête
			if (bookFound.userId !== req.auth.userId) {
				res.status(401).json({ message: 'Non authorisé' })
			} else {
				const filename = bookFound.imageUrl.split('/images/')[1] //récupère le chemin de l'image

				//pour la supprimer avec la méthode ".unlick()" de "fs"
				fs.unlink(`images/${filename}`, () => {
					//supprime ensuite le livre
					Book.deleteOne({ _id: req.params.id })
						.then(() =>
							res.status(200).json({ message: 'Livre supprimé de la BDD !' })
						)
						.catch((error) => res.status(400).json({ error }))
				})
			}
		})
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
