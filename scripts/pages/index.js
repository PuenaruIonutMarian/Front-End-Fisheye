import Api from "../api/Api.js";
import Photographer from "../models/Photographer.js";
import PhotographerTemplate from "../templates/index.js";

const photographersSection = document.querySelector(".photographer_section");
const photographersApi = new Api("./data/photographers.json");

const getPhotographers = async () => {
    try {
        const photographersData = await photographersApi.get();
        const photographers = photographersData.photographers;

        photographers
            .map(photographerData => new Photographer(photographerData))
            .forEach(photographer => {
                const template = new PhotographerTemplate(photographer);
                const photographerCard = template.getUserCardDOM();
                photographersSection.appendChild(photographerCard);
            });
    } catch (error) {
        console.error("Error fetching photographers:", error);
    }
};

getPhotographers();


    
