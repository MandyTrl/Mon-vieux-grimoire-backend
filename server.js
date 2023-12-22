const http = require('http') //"require" > cmd pour importer un package, ici; http de node. L'objet http va nous permettre de créer un serveur
const app = require('./app') //import d'Express

//fct qui renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
	const port = parseInt(val, 10) //parseInt() analyse une chaine de caractères et renvoie un entier

	if (isNaN(port)) {
		//isNan() analyse si l'argument n'est pas un nbre
		return val
	}
	if (port >= 0) {
		return port
	}
	return false
}

//utilisation de la fct normalizePort() sur le port de l'environnement ou le port "3000"
const port = normalizePort(process.env.PORT || '4000')

//définit sur quel port l'application Express va tourner
app.set(port)

//fct qui recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = (error) => {
	//vérifie si l'erreur est liée à l'opération d'écoute
	if (error.syscall !== 'listen') throw error

	//obtient l'adresse du serveur
	const address = server.address()

	//génère l'adresse du serveur en fonction de s'il reçoit une string ou un port
	const serverAddress =
		typeof address === 'string' ? 'pipe ' + address : 'port: ' + por

	//gestion des erreurs courantes en fonction du code d'erreur reçu au lancement du serveur
	switch (error.code) {
		case 'EACCES':
			console.error(serverAddress + ' nécessite des privilèges élevés.')
			process.exit(1)
		case 'EADDRINUSE':
			console.error(serverAddress + ' est déjà utilisé.')
			process.exit(1)
		default:
			throw error
	}
}

//createserver() est la méthode du package http qui permet de créer un serveur et qui reçoit la requête et la réponse de l'app Expres
const server = http.createServer(app)

//enregistrement d'un écouteur d'évènements, consignant le port ('port') ou le canal nommé ('string') sur lequel le serveur s'exécute dans la console
server.on('error', errorHandler)
server.on('listening', () => {
	const address = server.address()
	const serverAddress =
		typeof address === 'string' ? 'pipe ' + address : 'port ' + port
	console.log('| Listening on ' + serverAddress)
})

//permet au serveur d'écouter les requêtes sur le port normalisé
server.listen(port)
