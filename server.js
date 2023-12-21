const http = require('http') //"require" > cmd pour importer un package, ici; http de node. L'objet http va nous permettre de créer un serveur
const app = require('./app') //import d'Express

//définit sur quel port l'application Express va tourner
app.set('port', process.env.PORT || 3000)

//createserver() est la méthode du package http qui permet de créer un serveur et qui reçoit la requête et la réponse de l'app Expres
const server = http.createServer(app)

//permet au serveur d'écouter les requêtes sur le port de l'environnement ou le port "3000"
server.listen(process.env.PORT || 3000)
