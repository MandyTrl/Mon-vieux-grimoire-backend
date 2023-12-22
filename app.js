const express = require('express') //import d'express
const mongoose = require('mongoose') //import de Mongoose

//connexion à la BDD MongoDB
mongoose
	.connect(
		'mongodb+srv://MandyTrl:db_access_RW_monvieuxgrimoire@mon-vieux-grimoire.tehy6oi.mongodb.net/',
		{ useUnifiedTopology: true }
	)

	.then(() =>
		console.log(
			'| ✨Connexion à MongoDB pour la BDD @Mon vieux grimoire réussie !'
		)
	)
	.catch(() =>
		console.log(
			'| ❌Connexion à MongoDB pour la BDD @Mon vieux grimoire échouée !'
		)
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

app.post('/api/stuff', (req, res, next) => {
	console.log(req.body)
	res.status(201).json({
		message: 'Objet créé !',
	})
})

app.get('/api/stuff', (req, res, next) => {
	const stuff = [
		{
			_id: 'oeihfzeoi',
			title: 'Mon premier objet',
			description: 'Les infos de mon premier objet',
			imageUrl:
				'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
			price: 4900,
			userId: 'qsomihvqios',
		},
		{
			_id: 'oeihfzeomoihi',
			title: 'Mon deuxième objet',
			description: 'Les infos de mon deuxième objet',
			imageUrl:
				'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
			price: 2900,
			userId: 'qsomihvqios',
		},
	]
	res.status(200).json(stuff)
})

//export de l'application afin qu'elle soit utilisée à travers tous nos fichiers
module.exports = app
