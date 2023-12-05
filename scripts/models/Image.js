import Media from './Media.js'

/**
 * Classe représentant une image.
 */
export default class Image extends Media {
  /**
     * Créer l'instance de la classe Image.
     * @param {object} data - Les données à utiliser pour initialiser l'objet Image.
     */
  constructor (data) {
    // Appelle le constructeur de la classe Media
    super(data)

    // Initialise la cle de l'Image dans les données fournies
    this.image = data.image
  }
}
