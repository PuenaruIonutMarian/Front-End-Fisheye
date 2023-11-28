import Media from "./Media.js";

/**
 * Classe représentant une vidéo.
 */
export default class Video extends Media {
    /**
     * Crée une instance de la classe Video.
     * @param {object} data - Les données pour l'objet Video.
     */
    constructor(data) {
        // Appelle la classe Media avec les données fournies
        super(data);

        // Initialise la propriété Video avec les données fournies
        this.video = data.video;
    }
}
