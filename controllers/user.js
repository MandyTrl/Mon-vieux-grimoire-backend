const bcrypt = require('bcrypt') //import du package bcrypt
const jwt = require('jsonwebtoken') //import du package jsonwebtoken
const emailValidator = require('email-validator') //import du package email-validator
const passwordValidator = require('password-validator') //import du package password-validator
const User = require('../models/user') //import du model "user"

//création d'un schema de mdp
const passwordSchema = new passwordValidator()
passwordSchema
	.is()
	.min(8) //min. 8 caractères
	.is()
	.max(100) //max. 100 caractères
	.has()
	.uppercase() //doit contenir 1 majuscule
	.has()
	.lowercase() //doit contenir 1 minuscule
	.has()
	.digits() //doit contenir 1 chiffre
	.has()
	.not()
	.spaces() //ne doit pas contenir d'espaces

//crée un nouvel utilisateur
exports.signUp = (req, res) => {
	//on vérifie que le format de l'email est bien valide
	if (!emailValidator.validate(req.body.email)) {
		return res.status(400).json({ error: 'Em@il non valide' })
	}

	//vérifie si le mdp respecte le schéma défini pour + de sécurité
	if (!passwordSchema.validate(req.body.password)) {
		return res.status(400).json({
			error:
				"Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et ne pas contenir d'espaces.",
		})
	}

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
exports.login = (req, res) => {
	User.findOne({ email: req.body.email })
		.then((userFound) => {
			if (userFound === null) {
				res.status(401).json({ mesage: 'Identifiants de connexion invalides' })
			} else {
				bcrypt //on compare avec la méthode ".compare()" de bcrypt le mot de passe reçu dans la requête et celui enregistré dans la BDD
					.compare(req.body.password, userFound.password)
					.then(() => {
						if (!userFound) {
							res.status(401).json({ mesage: 'Erreur lors de la connexion' })
						} else {
							res.status(200).json({
								userId: userFound._id,
								token: jwt.sign(
									{ user: userFound._id },
									'RANDOM_TOKEN_SECRET',
									{
										expiresIn: '24h',
									}
								), //génère un token avec le package "jwt"
								message: 'Utilisateur authentifié !',
							})
						}
					})
					.catch((error) => res.status(500).json({ error }))
			}
		})
		.catch((error) => res.status(500).json({ error })) //on envoie une erreur de serveur car il s'agit d'une erreur concernant les requêtes
}
