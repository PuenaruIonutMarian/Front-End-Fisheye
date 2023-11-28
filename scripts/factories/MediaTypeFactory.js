import Image from '../models/Image.js';
import Video from '../models/Video.js';

/**
 * Classe représentant une Media Factory Dessing Pattern.
 */
export default class MediaTypeFactory {
    /**
     * Crée une instance de la media factory.
     * @param {object} data - Les données à utiliser pour créer le type de média.
     * @returns {Image|Video} Une instance de la classe Image ou Video
     * @throws {Error} Lance une erreur si le type de données est inconnu.
     */
    constructor(data) {
        // Vérifie si les données représentent une image
        if (data.image) {
            return new Image(data);
        }
        // Vérifie si les données représentent une vidéo
        if (data.video) {
            return new Video(data);
        }
        // Lance une erreur 
        throw new Error('Type de données inconnu');
    }
}
