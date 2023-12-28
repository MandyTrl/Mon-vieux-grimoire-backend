const mongoose = require('mongoose') //import de mongoose
const uniqueValidator = require('mongoose-unique-validator') //import de mongoose-unique-validator

//création du schéma d'un user
const userSchema = mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator) //utilisation de la méthode ".plugin()" pour appliquer au schema pour s'assurer que les emails soient uniques

const User = mongoose.model('User', userSchema) //création d'un modèle basé sur le schéma "userShema"
module.exports = User //export du model pour pouvoir l'utiliser
