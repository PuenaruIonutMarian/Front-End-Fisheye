/**
 * Classe représentant un des photographers.
 */
export default class Photographer {
  /**
     * Crée une instance de la classe Photographer.
     * @param {object} data - Les données pour initialiser l'objet Photographer.
     */
  constructor (data) {
    // Destructuration des propriétés de l'objet data
    const {
      name,
      id,
      city,
      country,
      tagline,
      price,
      portrait
    } = data

    // Initialisation des propriétés de l'objet Photographer avec les données fournies
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tagline = tagline
    this.price = price
    this.portrait = portrait
  }
}
