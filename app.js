//import d'express
const express = require('express')

//création de l'application avec la méthode "express()"
const app = express()

//utilisation de la methode "app.use()" qui reçoit 2 arguments pour recevoir les requêtes et renvoyer les réponses (ici en json)
app.use((req, res) => {
	res.json({ message: 'Votre requête a bien été reçue !' })
})

//export de l'application afin qu'elle soit utilisée à travers tous nos fichiers
module.exports = app
