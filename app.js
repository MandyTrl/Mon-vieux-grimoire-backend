const express = require('express') //import d'express
const mongoose = require('mongoose') //import de Mongoose
const path = require('path') //import du path de notre server
const app = express() //création de l'application avec la méthode "express()"
const bookRoutes = require('./routes/book.js') //import des routes de la collection "books"
const userRoutes = require('./routes/user.js') //import des routes de la collection "users"
const chalk = require('chalk') //import de la librairie "chalk" pour la personnalisation des logs

//connexion à la BDD MongoDB
mongoose
	.connect(
		'mongodb+srv://MandyTrl:db_access_RW_monvieuxgrimoire@mon-vieux-grimoire.tehy6oi.mongodb.net/'
	)

	.then(() =>
		console.log(
			chalk.bold('✨Connexion ') +
				'à la BDD MongoDB ' +
				'@' +
				chalk.underline('Mon vieux grimoire') +
				chalk.green(' réussie') +
				' !'
		)
	)
	.catch(() =>
		console.log(
			chalk.bold('❌Connexion ') +
				'à la BDD MongoDB ' +
				'@' +
				chalk.underline('Mon vieux grimoire') +
				chalk.red(' réussie') +
				' !'
		)
	)

app.use(express.json()) // sert à extraire le corps de la requête sous le format "JSON"

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

//IMAGE ROUTE ENDPOINT
app.use('/images', express.static(path.join(__dirname, 'images'))) //Express gére la ressource 'images' de manière statique

//BOOK'S ROUTES ENDPOINT
app.use('/api/books', bookRoutes)

//USER'S ROUTES ENDPOINT
app.use('/api/auth', userRoutes)

//export de l'application afin qu'elle soit utilisée à travers tous nos fichiers
module.exports = app
