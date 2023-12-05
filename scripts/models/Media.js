/**
 * Classe de base représentant le média du portofolio photographer.
 */
export default class Media {
    /**
     * Crée une instance de la classe Media.
     * @param {object} data - Les données à utiliser pour initialiser l'objet Media.
     */
    constructor(data) {
        // Destructuration des propriétés de l'objet data
        const {
            id,
            photographerId,
            title,
            likes,
            date,
            price
        } = data;

        // Initialisation des propriétés de l'objet Media avec les données fournies
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }
}