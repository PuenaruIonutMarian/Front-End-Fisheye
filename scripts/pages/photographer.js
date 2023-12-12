// Mettre le code JavaScript lié à la page photographer.html
import Api from '../api/Api.js'
import Photographer from '../models/Photographer.js'
import PhotographerTemplate from '../templates/photographer.js'
import MediaFactory from '../factories/MediaFactory.js'
import PhotographerMedias from '../templates/portofolio.js'
import { displayTotalLikes, addLikeButtonEventListeners } from '../utils/likes.js'
import { openCloseFilterMenu, displayMediaWithFilter } from '../utils/filter.js'
import { displayLightbox } from '../utils/lightbox.js'

// Représente l'élément HTML correspondant à l'en-tête du photographe.
const photographHeader = document.getElementsByClassName('photograph-header')
// Initialise l'API des photographes avec le chemin du fichier JSON.
const photographersApi = new Api('./data/photographers.json')
// Récupère l'identifiant du photographe depuis les paramètres de l'URL.
const photographerId = new URLSearchParams(window.location.search).get('id')
/**
 * Récupère les informations du photographe et ses médias associés par son identifiant.
 * @async
 * @function
 * @returns {Promise<{ photographer: Photographer | null, medias: MediaFactory[] }>} Les informations du photographe et ses médias.
 */

export const getPhotographerById = async () => {
  try {
    // Parse photographerId to ensure it's an integer
    const parsedPhotographerId = parseInt(photographerId, 10)

    // Récupère les données des photographes et des médias depuis l'API.
    const { photographers, media } = await photographersApi.get()
    // Recherche le photographe par son identifiant.
    const photographer = photographers
      .map(photographer => new Photographer(photographer))
      .find(photographer => photographer.id === parsedPhotographerId)

    // Filtre les médias associés au photographe par son identifiant.
    const medias = media
      .map(media => new MediaFactory(media).getMediaInstance())
      .filter(media => media.photographerId === parsedPhotographerId)

    return { photographer, medias: medias || [] } // Provide a default empty array
  } catch (error) {
    console.error('Error fetching photographer data:', error)
    throw error
  }
}

/**
 * Affiche la page de profil du photographe avec ses informations et médias associés.
 * @async
 * @function
 * @returns {Promise<void>} Une Promise qui se résout lorsque l'affichage est complet.
 */
const displayProfilePage = async () => {
  try {
    // Récupère les informations du photographe et ses médias associés.
    const { photographer, medias } = await getPhotographerById()

    // Vérifie si le photographe a été trouvé.
    if (!photographer) {
      console.error('Photographer not found.')
      return
    }

    // Crée et affiche le template de l'en-tête du photographe.
    const headerTemplate = new PhotographerTemplate(photographer)
    headerTemplate.getUserCardDOM()

    // Crée et affiche le template des médias du photographe.
    photographHeader[0].appendChild(headerTemplate.getUserCardDOM())
    const mediasTemplate = new PhotographerMedias(photographer, medias)
    mediasTemplate.createPhotographerMedias()

    // Valide le formulaire
    // eslint-disable-next-line no-undef
    validateForm()

    // Gère l'ouverture/fermeture du menu de filtre.
    openCloseFilterMenu()

    // Affiche la visionneuse de médias.
    displayLightbox(mediasTemplate)

    // Affiche le total des "likes" only if medias are available.
    if (medias.length > 0) {
      displayTotalLikes(photographer, medias)
    }
    addLikeButtonEventListeners(photographer, medias)
    // Affiche les médias en fonction des filtres.
    displayMediaWithFilter(mediasTemplate)
  } catch (error) {
    console.error('Error displaying profile page:', error)
  }
}

// Initialise et affiche la page de profil du photographe.
displayProfilePage()
