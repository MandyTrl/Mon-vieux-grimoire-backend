const User = require('../models/user') //import du model "user"

//crée un nouvel utilisateur
exports.signUp = (req, res) => {
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
