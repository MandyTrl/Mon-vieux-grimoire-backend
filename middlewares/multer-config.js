const multer = require('multer') //import du package multer

//définition des types de fichiers que l'on peut recevoir
const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
	'image/avif': 'avif',
}

const allowedExtensions = Object.values(MIME_TYPES)

//vérifie si l'extension de l'image est authorisée
const validateFile = (file, res, next) => {
	try {
		if (allowedExtensions.includes(file.mimetype)) {
			next()
		} else {
			throw new Error('Erreur lors de la saisie des données')
		}
	} catch (error) {
		res.status(400).json(error.message || 'Données invalides')
	}
}

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images') //va enregistrer dans le dossier "images" les images reçues
	},
	filename: (req, file, callback) => {
		const name = file.originalname
			.split(' ')
			.join('-')
			.replace(/\.[^.]*$/, '')
		//prend le nom du fichier original en remplaçant les espaces par des "_"
		const extension = MIME_TYPES[file.mimetype] //récupère le type de fichier reçu en l'associant à l'un de ceux définit plus haut

		const imgLink = name + Date.now() + '.' + extension

		callback(null, imgLink) //définit le nom de fichier qui sera enregistré en BDD "nom du fichier + un timestamp pour le rendre unique + son extension"
	},
})

//export du module storage. On indique avec ".single('file')" qu'un seul fichier sera envoyé via l'input 'file'
module.exports = [validateFile, multer({ storage: storage }).single('image')]
