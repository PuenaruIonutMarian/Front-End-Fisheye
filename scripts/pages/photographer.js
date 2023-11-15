//Mettre le code JavaScript lié à la page photographer.html


async function init() {
    try {
        // Extract photographer ID from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const photographerId = urlParams.get('id');
        console.log(photographerId);

        if (!photographerId) {
            console.error('Photographer ID does not exist.');
            return;
        }

        // Fetch  data from the JSON 
        const response = await fetch('./data/photographers.json');
        const data = await response.json();

        // Find the photographer with ID
        const photographerData = data.photographers.find((ph) => ph.id === parseInt(photographerId, 10));

        if (!photographerData) {
            console.error(`No Photographer ID ${photographerId} in the data JSON file.`);
            return;
        }

        // create the DOM elements
        const photographerModel = photographerTemplate(photographerData);
        const photographerDOM = photographerModel.getUserCardDOM();

        // Append the content
        const photographHeader = document.querySelector('.photograph-header');
        photographHeader.appendChild(photographerDOM);

    } catch (error) {
        console.error('The error from when creating the photographer page', error);
    }
}




init();
// document.addEventListener('DOMContentLoaded', init);