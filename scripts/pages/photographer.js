// //Mettre le code JavaScript lié à la page photographer.html

// // Fetch JSON Data from photographers json
async function getJSONData() {
    try {
        const response = await fetch("./data/photographers.json");
        const data = await response.json();
        return data || { photographers: [], media: [] };
    } catch (error) {
        console.error('Error fetching JSON data', error);
        return { photographers: [], media: [] };
    }
}

// Get data of photographers 
async function getPhotographers() {
    return { photographers: (await getJSONData()).photographers };
}

//get media of photgrapher
async function getMedia() {
    return { media: (await getJSONData()).media };
}




// display photographer data ( the function from index.js)
async function photographerHeaderData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}


// Obtain the media of a photographer
async function getMediaByPhotographerId() {
    try {
        const { media } = await getMedia();

        // Obtain the photographer ID once
        const photographerId = parseInt(getPhotographerId(), 10);

        const mediaByPhotographer = media.filter(item => item.photographerId === photographerId);

        return mediaByPhotographer || [];
    } catch (error) {
        console.error('Error when getting media by photographer ID', error);
        return [];
    }
}


//obtain the ID of the photographer profile
function getPhotographerId() {
    return new URLSearchParams(window.location.search).get('id');
}

//Find the photographer with the ID
async function getPhotographerById(photographerId) {
    try {
        const { photographers } = await getPhotographers();
        const photographerData = photographers.find((photographer) => photographer.id === parseInt(photographerId, 10));

        if (!photographerData) {
            console.error(`No Photographer ID ${photographerId} in the data JSON file.`);
        }

        return photographerData || null;
    } catch (error) {
        console.error('Error when getting photographer by ID', error);
        return null;
    }
}


// Initialize the header and portfolio of the photographer
async function photographerHeader() {
    try {
        const photographerId = getPhotographerId();

        if (!photographerId) {
            console.error('Photographer ID does not exist.');
            return;
        }

        const photographerData = await getPhotographerById(photographerId);

        if (!photographerData) {
            return;
        }

        photographerHeaderData([photographerData]);

        const mediaData = await getMediaByPhotographerId();

        if (!mediaData || mediaData.length === 0) {
            console.error('No media found for the photographer.');
            return;
        }

        const mediaCardContainer = document.querySelector(".photographer-media-section");

mediaData.forEach((mediaItem, index) => {
    const mediaCard = createMediaCard(photographerData, mediaItem, index);
    mediaCardContainer.appendChild(mediaCard);
});

    } catch (error) {
        console.error('Error in photographerHeader function', error);
    }
}

// Usage example
photographerHeader();



function createMediaCard(photographer, media, index) {
    const mediaCard = document.createElement('figure');
    const infoCaption = document.createElement('figcaption');
    const titleHeading = document.createElement('h2');
    const likesParagraph = document.createElement('p');
    const likesSpan = document.createElement('span');
    const heartButton = document.createElement('button');
    const imageSpan = document.createElement('span');
    const heartImage = document.createElement('img');

    if (media.image) {
        const imageElement = document.createElement('img');
        imageElement.classList.add('image');
        imageElement.src = `../../assets/portofolio/${photographer.name}/${media.image}`;
        imageElement.alt = media.title;
        imageElement.tabIndex = 0;

        mediaCard.appendChild(imageElement);
        mediaCard.classList.add('photo-media');
    } else if (media.video) {
        const videoElement = document.createElement('video');
        videoElement.classList.add('video');
        videoElement.src = `../../assets/portofolio/${photographer.name}/${media.video}`;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.tabIndex = 0;

        mediaCard.appendChild(videoElement);
        mediaCard.classList.add('video-media');
    }

    infoCaption.appendChild(titleHeading);
    infoCaption.appendChild(likesParagraph);

    likesParagraph.appendChild(likesSpan);
    likesParagraph.appendChild(heartButton);

    heartButton.appendChild(imageSpan);
    imageSpan.appendChild(heartImage);

    mediaCard.appendChild(infoCaption);


    titleHeading.textContent = media.title;

    likesSpan.textContent = media.likes;
    
    infoCaption.classList.add("info");
    likesParagraph.classList.add("likes");
    likesParagraph.id = `likes-${index}`;
    likesSpan.classList.add("span_likes")


    heartButton.classList.add('heart-button', 'liked');
    heartButton.setAttribute('data-index', index);

    heartImage.src = 'assets/icons/coeur.svg';
    heartImage.alt = 'coeur';

    return mediaCard;
}


document.addEventListener('DOMContentLoaded', function () {
    // Get the button element
    const toggleDropdownButton = document.getElementById('toggleDropdown');

    // Get the element to show/hide
    const separatePopulareElement = document.querySelector('.separate_populare');
    const separateDateElement = document.querySelector('.separate_date');
    const sortByDateButton = document.querySelector("#sortByDate");
    const sortByTitleButton = document.querySelector("#sortByTitle");
    const dropDownButton = document.getElementById('toggleDropdown');
    
    // Get the elements with class "fa-chevron-up" and "fa-chevron-down"
    const chevronUp = document.querySelector(".fa-chevron-up");
    const chevronDown = document.querySelector(".fa-chevron-down");

    // Add click event listener
    toggleDropdownButton.addEventListener('click', function () {
        // Toggle the "hide" class on the separate elements
        separateDateElement.classList.toggle('hide');
        separatePopulareElement.classList.toggle('hide');
        sortByDateButton.classList.toggle('hide');
        sortByTitleButton.classList.toggle('hide');
        dropDownButton.style.borderRadius = '0px';
        
        // Toggle visibility of chevron icons
        chevronDown.style.display = 'none';
        chevronUp.style.display = 'inline-block';
    });
});


