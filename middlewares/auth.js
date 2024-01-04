const jwt = require('jsonwebtoken') //import du package jsonwebtoken

module.exports = (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1] //récupère le token dans le headers de la requête et coupe après le mot "Bearer" la bonne valeur
		const decodedToken = jwt.verify(token, 'TOKEN_KEY') //on décode le token avec la méthode ".verify()" du package jsonwebtoken en lui passant en 2nd argument la clé secret
		const userId = decodedToken.userId
		req.auth = {
			userID: userID,
		}
	} catch (error) {
		res.status(401).json({ error }) //erreur d'accès
	}
}
