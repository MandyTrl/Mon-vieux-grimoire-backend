//import d'express
const express = require('express')

//création de l'application avec la méthode "express()"
const app = express()

//utilisation de la methode "app.use()" qui reçoit 2 arguments pour recevoir les requêtes et renvoyer les réponses (ici en json)
app.use((req, res, next) => {
	res.status(201) //renvoit une réponse serveur réussie en "201"
	console.log('Requête reçue !')
	next() //méthode qui permet de passer à la fonction suivante
})

//utilisation de la methode "app.use()" qui reçoit 2 arguments pour recevoir les requêtes et renvoyer les réponses (ici en json)
app.use((req, res) => {
	res.json({ message: 'Votre requête a bien été reçue !' })
	console.log('Réponse envoyée avec succès :)')
})

//export de l'application afin qu'elle soit utilisée à travers tous nos fichiers
module.exports = app
