/**
 * Représente une API pour la gestion des données des photographes.
 * @typedef {import('../api/Api.js')} Api
 */
import Api from '../api/Api.js'

/**
 * Représente un modèle pour afficher les informations d'un photographe.
 * @typedef {import('../templates/photographer.js')} PhotographerTemplate
 */
import PhotographerTemplate from '../templates/photographer.js'

// Initialiser l'API pour apres recuperer les donnees.
const photographersApi = new Api('./data/photographers.json')

/**
 * Récupère les données des photographes depuis l'API.
 * @async
 * @function
 * @returns {Promise<{ photographers: Photographer[] }>} Un objet contenant un tableau de photographes.
 */
async function getPhotographers () {
  const photographers = (await photographersApi.get()).photographers || []
  return ({
    photographers: [...photographers]
  })
}

/**
 * Affiche les données des photographes sur la page web.
 * @async
 * @function
 * @param {Photographer[]} photographers - Un tableau de photographes à afficher.
 * @returns {Promise<void>} Une Promise qui se résout lorsque l'affichage est complet.
 */
async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerTemplate(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

/**
 * Initialise l'application en récupérant les données des photographes et en les affichant sur la page web.
 * @async
 * @function
 * @returns {Promise<void>} Une Promise qui se résout lorsque l'initialisation est complète.
 */
async function init () {
  // Récupère les datas des photographes
  const {
    photographers
  } = await getPhotographers()
  displayData(photographers)
}

// Initialiser l'application.
init()
