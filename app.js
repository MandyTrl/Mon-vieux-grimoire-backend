const express = require('express') //import d'express
const mongoose = require('mongoose') //import de Mongoose
const bookRoutes = require('./routes/book.js') //import des routes de la collection "books"
const userRoutes = require('./routes/user.js') //import des routes de la collection "users"

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

//BOOK'S ROUTES ENDPOINT
app.use('api/books', bookRoutes)

//USER'S ROUTES ENDPOINT
app.use('api/auth', bookRoutes)

//export de l'application afin qu'elle soit utilisée à travers tous nos fichiers
module.exports = app
