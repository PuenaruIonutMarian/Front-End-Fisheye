import { displayTotalLikes } from "../utils/likes.js";
import { displayLightbox } from "../utils/lightbox.js";

export const openCloseFilterMenu = () => {
    const filterMenu = document.querySelector(".dropdown_content");
    const filterMenuButton = document.querySelector(".btn_drop");
    const filterButtons = document.querySelectorAll(".dropdown_content button");

    filterMenuButton.addEventListener("click", () => {
        const isExpanded = filterMenuButton.getAttribute("aria-expanded") === "true" || false;
        filterMenuButton.setAttribute("aria-expanded", !isExpanded);
        filterMenu.classList.toggle("curtain_effect");
        document.querySelector(".fa-chevron-up").classList.toggle("rotate");

        const newAriaHiddenValue = filterMenu.classList.contains("curtain_effect") ? "false" : "true";
        filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);

        const newTabIndexValue = filterMenu.classList.contains("curtain_effect") ? "0" : "-1";
        filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));
    });
};



export const displayMediaWithFilter = mediasTemplate => {
    const currentFilter = document.querySelector('#current_filter');
    const allFilters = Array.from(document.querySelectorAll('.dropdown_content li button'));

    let filterAlreadySelected = allFilters.find(filter => filter.textContent == currentFilter.textContent);
    filterAlreadySelected.style.display = 'none';

    allFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            currentFilter.textContent = filter.textContent;
            if (filterAlreadySelected) filterAlreadySelected.style.display = 'block';
            filterAlreadySelected = filter;
            filterAlreadySelected.style.display = 'none';
            sortByFilter(filter.textContent);
        });
    });

    const sortByFilter = filterValue => {
        switch (filterValue) {
            case 'Titre':
                mediasTemplate.medias.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Popularité':
                mediasTemplate.medias.sort((a, b) => b.likes - a.likes);
                break;
            case 'Date':
                mediasTemplate.medias.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        // Clear existing media cards
        const profilePageContent = document.querySelector(".main_content_medias");
        profilePageContent.innerHTML = '';

        // Create and append new media cards
        const gallerySection = document.createElement("section");
        gallerySection.classList.add("gallery");

        mediasTemplate.medias.forEach(media => {
            const mediaCard = document.createElement("article");
            mediaCard.classList.add("gallery_card");

            // Create and append other elements (as before...)
            
            gallerySection.appendChild(mediaCard);
        });

        const asideElement = document.createElement("aside");
        // Create and append aside (as before...)

        profilePageContent.appendChild(gallerySection);
        profilePageContent.appendChild(asideElement);

        // Continue with your other logic (lightbox, total likes, animation)
        mediasTemplate.createPhotographerMedias();
        const mediasFiltered = mediasTemplate;
        displayLightbox(mediasFiltered);
        displayTotalLikes();

        const mediaElements = document.querySelectorAll('.gallery_card');
        mediaElements.forEach((media, index) => {
            setTimeout(() => {
                media.classList.add('animeCard');
            }, 100 * index);
        });
    };
};