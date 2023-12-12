import Image from '../models/Image.js'
import Video from '../models/Video.js'

/**
 * Classe représentant un patron de conception de fabrique de médias.
 */
export default class MediaFactory {
  /**
   * Crée une instance de la fabrique de médias.
   * @param {object} data - Les données à utiliser pour créer le type de média.
   * @returns {Image|Video} Une instance de la classe Image ou Video.
   * @throws {Error} Lève une erreur si le type de données est inconnu.
   */
  constructor (data) {
    // Vérifie si les données représentent une image
    if (data.image) {
      // Initialise l'instance et la stocke dans this
      this.mediaInstance = new Image(data)
    // eslint-disable-next-line brace-style
    }
    // Vérifie si les données représentent une vidéo
    else if (data.video) {
      // Initialise l'instance et la stocke dans this
      this.mediaInstance = new Video(data)
    // eslint-disable-next-line brace-style
    }
    // Lève une erreur si le type de données est inconnu
    else {
      throw new Error('Unknown data type')
    }
  }

  // Ajoute une méthode pour obtenir l'instance créée
  getMediaInstance () {
    return this.mediaInstance
  }
}
