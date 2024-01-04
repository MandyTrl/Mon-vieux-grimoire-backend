const multer = require('multer') //import du package multer

//définition des types de fichiers que l'on peut recevoir
const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
}

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		console.log('@name', file)
		callback(null, 'images') //va enregistrer dans le dossier "images" les images réçues
	},
	filename: (req, file, callback) => {
		const name = file.originalname
			.split(' ')
			.join('_')
			.replace(/\.[^.]*$/, '')
		//prend le nom du fichier original en remplaçant les espaces par des "_"
		const extension = MIME_TYPES[file.mimetype] //récupère le type de fichier reçu en l'associant à l'un de ceux définit plus haut

		callback(null, name + Date.now() + '.' + extension) //définit le nom de fichier qui sera enregistré en BDD "nom du fichier + un timestamp pour le rendre unique + son extension"
	},
})

//export du module storage. On indique avec ".single('file')" qu'un seul fichier sera envoyé via l'input 'file'
module.exports = multer({ storage: storage }).single('image')
