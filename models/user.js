const mongoose = require('mongoose') //import de mongoose

//création du schéma d'un livre
const userSchema = mongoose.Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
})

const User = mongoose.model('User', userSchema) //création d'un modèle basé sur le schéma "userShema"
module.exports = User //export du model pour pouvoir l'utiliser
