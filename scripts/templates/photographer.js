/**
 * Représente un template pour la création de la carte utilisateur d'un photographe.
 */
export default class PhotographerTemplate {
  /**
   * Initialise une nouvelle instance du template avec les données du photographe.
   * @param {Object} photographer - Les données du photographe.
   * @param {number} photographer.id - L'identifiant unique du photographe.
   * @param {string} photographer.name - Le nom du photographe.
   * @param {string} photographer.portrait - Le chemin vers le portrait du photographe.
   * @param {string} photographer.city - La ville du photographe.
   * @param {string} photographer.country - Le pays du photographe.
   * @param {string} photographer.tagline - La description ou tagline du photographe.
   * @param {number} photographer.price - Le prix du photographe par jour.
   */
  constructor (photographer) {
    this.photographer = photographer
  }

  /**
   * Crée et retourne l'élément DOM de la carte utilisateur du photographe.
   * @returns {HTMLArticleElement} L'élément article représentant la carte utilisateur du photographe.
   */
  getUserCardDOM () {
    // Crée un élément article
    const article = document.createElement('article')

    // Crée un élément lien
    const linkElement = document.createElement('a')
    linkElement.href = `photographer.html?id=${this.photographer.id}`
    linkElement.setAttribute('role', 'link')
    linkElement.setAttribute('aria-label', `View the profile of ${this.photographer.name}`)

    // Crée un élément image
    const imgElement = document.createElement('img')
    imgElement.classList.add('photographer_thumbnail')
    imgElement.src = `./assets/photographers/small_format/${this.photographer.portrait}`
    imgElement.alt = this.photographer.name

    // Crée un élément h2
    const h2Element = document.createElement('h2')
    h2Element.classList.add('photographer_name')
    h2Element.textContent = this.photographer.name

    // Ajoute l'image et le h2 au lien
    linkElement.appendChild(imgElement)
    linkElement.appendChild(h2Element)

    // Crée des paragraphes
    const locationParagraph = document.createElement('p')
    locationParagraph.classList.add('photographer_location')
    locationParagraph.textContent = `${this.photographer.city}, ${this.photographer.country}`

    const taglineParagraph = document.createElement('p')
    taglineParagraph.classList.add('photographer_tagline')
    taglineParagraph.textContent = this.photographer.tagline

    // Crée un span pour le prix
    const priceSpan = document.createElement('span')
    priceSpan.classList.add('photographer_price')
    priceSpan.textContent = `${this.photographer.price}€/day`

    // Ajoute le lien, les paragraphes et le span à l'article
    article.appendChild(linkElement)
    article.appendChild(locationParagraph)
    article.appendChild(taglineParagraph)
    article.appendChild(priceSpan)

    return article
  }
}
