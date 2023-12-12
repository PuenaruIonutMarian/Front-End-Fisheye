import { displayTotalLikes } from '../utils/likes.js'
import { displayLightbox } from '../utils/lightbox.js'

/**
 * Gère l'ouverture et la fermeture du menu de filtre.
 * @returns {void}
 */
export const openCloseFilterMenu = () => {
  // Sélectionne les éléments du menu de filtre.
  const filterMenu = document.querySelector('.dropdown_content')
  const filterMenuButton = document.querySelector('.btn_drop')
  const filterButtons = document.querySelectorAll('.dropdown_content button')

  // Ajoute un écouteur d'événement au bouton du menu de filtre.
  filterMenuButton.addEventListener('click', (event) => {
    event.preventDefault()
    // Vérifie si le menu est actuellement étendu.
    const isExpanded = filterMenuButton.getAttribute('aria-expanded') === 'true' || false

    // Inverse l'état aria-expanded pour ouvrir ou fermer le menu.
    filterMenuButton.setAttribute('aria-expanded', !isExpanded)

    // Applique l'effet de rideau au menu.
    filterMenu.classList.toggle('curtain_effect')

    // Fait pivoter l'icône de flèche vers le haut ou le bas.
    document.querySelector('.fa-chevron-up').classList.toggle('rotate')

    // Détermine les nouvelles valeurs des attributs aria-hidden et tabindex du menu.
    const newAriaHiddenValue = filterMenu.classList.contains('curtain_effect') ? 'false' : 'true'
    filterMenu.setAttribute('aria-hidden', newAriaHiddenValue)

    const newTabIndexValue = filterMenu.classList.contains('curtain_effect') ? '0' : '-1'
    filterButtons.forEach(button => button.setAttribute('tabindex', newTabIndexValue))
  })
}

export const displayMediaWithFilter = (mediasTemplate) => {
  // Sélectionne les éléments relatifs au filtre actuel et à tous les filtres disponibles.
  const currentFilter = document.querySelector('#current_filter')
  const allFilters = Array.from(document.querySelectorAll('.dropdown_content li button'))

  // eslint-disable-next-line eqeqeq
  let filterAlreadySelected = allFilters.find((filter) => filter.textContent == currentFilter.textContent)
  filterAlreadySelected.style.display = 'none'

  /**
   * Trie les médias en fonction de la valeur du filtre.
   * @param {string} filterValue - La valeur du filtre.
   * @returns {void}
   */
  const sortByFilter = (filterValue) => {
    switch (filterValue) {
      case 'Titre':
        mediasTemplate.medias.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'Popularité':
        mediasTemplate.medias.sort((a, b) => b.likes - a.likes)
        break
      case 'Date':
        mediasTemplate.medias.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
    }

    // Sélectionne le contenu de la page du profil du photographe.
    const profilePageContent = document.querySelector('.portofolio')
    profilePageContent.innerHTML = ''

    // Recrée les médias du photographe en fonction du nouveau tri.
    mediasTemplate.createPhotographerMedias()

    // Affiche la lightbox et le nombre total de likes.
    displayLightbox(mediasTemplate)

    // Applique une animation aux éléments médias.
    const mediaElements = document.querySelectorAll('.portofolio')
    mediaElements.forEach((media, index) => {
      setTimeout(() => {
        media.classList.add('animeCard')
      }, 100 * index)
    })

    // Update the medias array in the displayTotalLikes function
    displayTotalLikes(mediasTemplate.photographer, mediasTemplate.medias)
  }

  /**
   * Affiche les médias en fonction du filtre sélectionné.
   * @param {string} filterValue - La valeur du filtre.
   * @returns {void}
   */
  const displayMediaByFilter = (filterValue) => {
    // Vérifie si le filtre sélectionné est différent de 'Popularité'.
    if (filterValue !== 'Popularité') {
      mediasTemplate.medias.sort((a, b) => a.title.localeCompare(b.title))
    }

    // Trie les médias en fonction du filtre sélectionné.
    sortByFilter(filterValue)
  }

  // Vérifie le filtre actuel lors du chargement initial et affiche les médias en conséquence.
  displayMediaByFilter(currentFilter.textContent)

  // Ajoute des écouteurs d'événements aux boutons de filtre.
  allFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      // Met à jour le filtre actuel et réaffiche le filtre précédemment sélectionné.
      currentFilter.textContent = filter.textContent
      if (filterAlreadySelected) filterAlreadySelected.style.display = 'block'

      filterAlreadySelected = filter
      filterAlreadySelected.style.display = 'none'

      // Affiche les médias en fonction du filtre sélectionné.
      displayMediaByFilter(filter.textContent)
    })
  })
}
