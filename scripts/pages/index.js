import Api from '../api/Api.js'
// import Photographer from "../models/Photographer.js";
import PhotographerTemplate from '../templates/photographer.js'

const photographersApi = new Api('./data/photographers.json')

async function getPhotographers () {
  const photographers = (await photographersApi.get()).photographers || []
  return ({
    photographers: [...photographers]
  })
}

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = new PhotographerTemplate(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init () {
  // Récupère les datas des photographes
  const {
    photographers
  } = await getPhotographers()
  displayData(photographers)
}

init()
