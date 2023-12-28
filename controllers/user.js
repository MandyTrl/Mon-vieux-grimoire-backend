const User = require('../models/user') //import du model "user"

//crée un nouvel utilisateur
exports.signUp = (req, res) => {
	bcrypt
		.hash(req.body.password, 10) //hashage du mdp en prenant en paramètre le mdp de la requête et le "salt"
		.then((hashedPassword) => {
			const user = new User({
				email: req.body.email,
				password: hashedPassword, //on passe le mdp hashé
			})
			user
				.save() //enregistre le nouvel user en BDD
				.then(() =>
					res.status(201).json({
						message: 'Utilisateur créé !',
					})
				)
				.catch((error) => res.status(400).json({ error }))
		})
		.catch((error) => res.status(500).json({ error }))
}

//authentification de l'utilisateur
exports.addUser = (req, res) => {
	User.findOne({ _id: req.params.id })
		.then(() =>
			res.status(200).json({
				message: 'Utilisateur authentifié !',
			})
		) //récupère la promesse pour afficher le livre sous un format json
		.catch((error) => res.status(400).json({ error }))
}
