const express = require('express') //import d'express
const mongoose = require('mongoose') //import de Mongoose
const Book = require('./models/book') //import du model "book"
const User = require('./models/user') //import du model "user"

//connexion à la BDD MongoDB
mongoose
	.connect(
		'mongodb+srv://MandyTrl:db_access_RW_monvieuxgrimoire@mon-vieux-grimoire.tehy6oi.mongodb.net/'
	)

	.then(() =>
		console.log('| ✨Connexion à la BDD MongoDB @Mon vieux grimoire réussie !')
	)
	.catch(() =>
		console.log('| ❌Connexion à la BDD MongoDB @Mon vieux grimoire échouée !')
	)

//création de l'application avec la méthode "express()"
const app = express()

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	)
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS'
	)
	next()
})

app.use(express.json()) //sert à extraire le corps de la requête sous le format "JSON"

//BOOK'S ROUTES
//ajoute un livre à la BDD
app.post('/api/books', (req, res) => {
	const book = new Book({
		...req.body,
	}) //récupère de la requête le "body" pour l'intégrer à un nouveau document "book"

	book
		.save() //sauvegarde le livre en BDD
		.then(() =>
			res.status(201).json({
				message: 'Livre ajouté à la BDD !',
			})
		)
		.catch((error) => res.status(400).json({ error }))
})

//récupére tous les livres de la BDD
app.get('/api/books', (req, res) => {
	Book.find() //va récupérer tous les livres de la BDD
		.then((books) => res.status(200).json(books)) //récupère la promesse pour afficher les livres sous un format json
		.catch((error) => res.status(400).json({ error }))
})

//récupére un livre via son "id"
app.get('/api/books/:id', (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then((bookFound) => res.status(200).json(bookFound)) //récupère la promesse pour afficher le livre sous un format json
		.catch((error) => res.status(400).json({ error }))
})

//modifie un livre à la BDD via son "id"
app.put('/api/books/:id', (req, res) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() =>
			res.status(200).json({ message: 'Le livre a bien été modifié !' })
		)
		.catch((error) => res.status(400).json({ error }))
})

//supprime un livre à la BDD via son "id"
app.delete('/api/books/:id', (req, res) => {
	Book.deleteOne({ _id: req.params.id })
		.then(() => res.status(200).json({ message: 'Livre supprimé de la BDD !' }))
		.catch((error) => res.status(400).json({ error }))
})

//ajoute une notation à un livre à la BDD via son "id"
app.put('/api/books/:id/rating', (req, res) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() =>
			res
				.status(200)
				.json({ message: 'La notation a bien été prise en compte !' })
		)
		.catch((error) => res.status(400).json({ error }))
})

//renvoie le top 3 des livres les mieux évalués
app.get('/api/books/bestrating', (req, res) => {
	Book.find() //va récupérer tous les livres de la BDD
		.then((books) => res.status(200).json(books)) //récupère la promesse pour afficher les livres sous un format json
		.catch((error) => res.status(400).json({ error }))
})

//USER'S ROUTES
//crée un nouvel utilisateur
app.post('/api/auth/signup', (req, res) => {
	console.log(req.body)
	const user = new User({
		...req.body,
	})

	console.log(user)

	user
		.save()
		.then(() =>
			res.status(201).json({
				message: 'Nouvel utilisateur ajouté à la BDD !',
			})
		)
		.catch((error) => res.status(400).json({ error }))
})

//authentification de l'utilisateur
app.post('/api/auth/login', (req, res) => {
	User.findOne({ _id: req.params.id })
		.then(() =>
			res.status(200).json({
				message: 'Utilisateur authentifié !',
			})
		) //récupère la promesse pour afficher le livre sous un format json
		.catch((error) => res.status(400).json({ error }))
})

//export de l'application afin qu'elle soit utilisée à travers tous nos fichiers
module.exports = app
