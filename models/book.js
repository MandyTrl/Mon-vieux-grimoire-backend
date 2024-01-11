const mongoose = require('mongoose') //import de mongoose

//création du schéma d'un livre
const bookSchema = mongoose.Schema({
	userId: { type: String },
	title: { type: String, required: true },
	author: { type: String, required: true },
	imageUrl: { type: String, required: true },
	year: { type: Number },
	genre: { type: String, required: true },
	ratings: [
		{
			userId: { type: String, required: true },
			grade: { type: Number },
		},
	],
	averageRating: { type: Number },
})

const Book = mongoose.model('Book', bookSchema) //création d'un modèle basé sur le schéma "bookShema"
module.exports = Book //export du model pour pouvoir l'utiliser
