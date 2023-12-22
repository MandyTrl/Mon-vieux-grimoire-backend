const mongoose = require('mongoose') //import de mongoose
const uuid = require('uuid') //import de uuid

//création du schéma d'un livre
const userSchema = mongoose.Schema({
	userId: {
		type: String,
		defautl: () => uuid.v4, //génère un identifiant unique comme valeur par défaut grace à "uuid"
		unique: true,
		required: true,
	},
	email: { type: String, required: true },
	password: { type: String, required: true },
})

const User = mongoose.model('User', userSchema) //création d'un modèle basé sur le schéma "bookShema"
