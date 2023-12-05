//Mettre le code JavaScript lié à la page photographer.html
import Api from "../api/Api.js";
import Photographer from "../models/Photographer.js";
import PhotographerTemplate from "../templates/photographer.js";
import MediaFactory from "../factories/MediaFactory.js";
import PhotographerMedias from "../templates/portofolio.js";
import { displayTotalLikes } from "../utils/likes.js";
import { openCloseFilterMenu, displayMediaWithFilter } from "../utils/filter.js";
import { displayLightbox } from "../utils/lightbox.js";





const photographHeader = document.getElementsByClassName("photograph-header");
const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");


export const getPhotographerById = async () => {
    try {
        const { photographers, media } = await photographersApi.get();
        const photographer = photographers
            .map(photographer => new Photographer(photographer))
            .find(photographer => photographer.id == photographerId);
        const medias = media
            .map(media => new MediaFactory(media))
            .filter(media => media.photographerId == photographerId);
        return { photographer, medias };
    } catch (error) {
        console.error("Error fetching photographer data:", error);
        return { photographer: null, medias: [] };
    }
};

const displayProfilePage = async () => {
    try {
        const { photographer, medias } = await getPhotographerById();
        if (!photographer) {
            console.error("Photographer not found.");
            return;
        }

        const headerTemplate = new PhotographerTemplate(photographer);
        headerTemplate.getUserCardDOM();
        photographHeader[0].appendChild(headerTemplate.getUserCardDOM());
        const mediasTemplate = new PhotographerMedias(photographer, medias);
        mediasTemplate.createPhotographerMedias();
        

        displayTotalLikes();
        validateForm();
        openCloseFilterMenu();
        displayMediaWithFilter(mediasTemplate);
        displayLightbox(mediasTemplate);
   
    } catch (error) {
        console.error("Error displaying profile page:", error);
    }
};

displayProfilePage();

