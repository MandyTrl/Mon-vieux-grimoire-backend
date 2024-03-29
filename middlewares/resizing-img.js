const sharp = require('sharp') //import du package sharp
const fs = require('fs').promises //import du module fs de node pour la gestion des fichiers
const path = require('path') //import du path de notre server
const chalk = require('chalk') //import de la librairie "chalk" pour la personnalisation des logs

module.exports = async (req, res, next) => {
	try {
		if (!req.file) {
			console.log('no file in the body !')
			return next()
		}

		const filename = req.file.filename.replace(/\.[^.]*$/, '')
		const newFileName = `resized-${filename}.webp`

		await sharp(req.file.path)
			.resize(824, 1040, 'contain') //dimensions du front
			.webp({ quality: 80 })
			.toFile(path.join('images', newFileName))

		//on remplace/supprime le chemin initial par le nvx seulement s'il existe
		try {
			await fs.access(`images/${req.file.filename}`)
			await fs.unlink(`images/${req.file.filename}`)
		} catch (error) {
			console.error(
				chalk.bold('|', chalk.red('!'), '|') +
					"Le fichier n'existe pas ou n'a pas pu être supprimé :",
				req.file.filename,
				error.message
			)
		}

		next()
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}
