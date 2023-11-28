import Api from "../api/Api.js";
import PhotographerHeader from "../templates/photographer.js";
import PhotographerMedias from "../templates/portofolio.js";
import Photographer from "../models/Photographer.js";
import MediaTypeFactory from "../factories/MediaTypeFactory.js";
import { displayTotalLikes } from "../utils/likes.js";
import { openCloseFormContact, validateForm } from "../utils/Contactform.js";
import { openCloseFilterMenu, displayMediaWithFilter } from "../utils/filter.js";
import { displayLightbox } from "../utils/lightbox.js";

const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");

export const getPhotographerById = async () => {
    try {
        const { photographers, media } = await photographersApi.get();
        const photographer = photographers
            .map(photographer => new Photographer(photographer))
            .find(photographer => photographer.id == photographerId);
        const medias = media
            .map(media => new MediaTypeFactory(media))
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

        const headerTemplate = new PhotographerHeader(photographer);
        headerTemplate.createPhotographerHeader();
        const mediasTemplate = new PhotographerMedias(photographer, medias);
        mediasTemplate.createPhotographerMedias();
        // console.log(mediasTemplate);

        displayTotalLikes();
        openCloseFormContact();
        validateForm();
        openCloseFilterMenu();
        displayMediaWithFilter(mediasTemplate);
        displayLightbox(mediasTemplate);
    } catch (error) {
        console.error("Error displaying profile page:", error);
    }
};

displayProfilePage();


