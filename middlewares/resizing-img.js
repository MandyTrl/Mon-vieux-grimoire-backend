const sharp = require('sharp') //import du package sharp
const fs = require('fs').promises //import du module fs de node pour la gestion des fichiers
const path = require('path') //import du path de notre server

module.exports = async (req, res, next) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'file not found' })
		}

		const filename = req.file.filename.replace(/\.[^.]*$/, '')
		const newFileName = `resized-${filename}.webp`

		console.log('@chemin :', req.file.path)
		console.log('@nvx chemin :', path.join('images', newFileName))

		await sharp(req.file.path)
			.resize(824, 1040, 'contain') //dimensions du front
			.webp({ quality: 80 })
			.toFile(path.join('images', newFileName))

		//on remplace/supprime le chemin initial par le nvx
		await fs.unlink(req.file.path)

		res.status(200).json({ message: 'Image resized' })
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}
