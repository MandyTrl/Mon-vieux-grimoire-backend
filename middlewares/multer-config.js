const multer = require('multer') //import du package multer

//définition des types de fichiers que l'on peut recevoir
const MYME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
}

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'Images') //va enregistrer dans le dossier "Images" les images réçues
	},
	filename: (req, file, callback) => {
		const name = file.originalName().split(' ').join('_') //prend le nom du fichier original en remplaçant les espaces par des "_"
		const extension = MYME_TYPES[file.mimetype] //récupère le type de fichier reçu en l'associant à l'un de ceux définit plus haut

		callback(null, name + Date.now() + '.' + extension) //définit le nom de fichier qui sera enregistré en BDD "nom du fichier + un timestamp pour le rendre unique + son extension"
	},
})

//export du module storage. On indique avec ".single(images)" qu'un seul fichier sera envoyé via l'input 'images'
module.exports(multer({ storage })).single(images)
