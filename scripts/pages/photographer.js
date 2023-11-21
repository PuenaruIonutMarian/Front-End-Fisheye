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

        // Create media card HTML
        const mediaCardHTML = mediaData
            .map((mediaItem, index) => createMediaCard(photographerData, mediaItem, index))
            .join(''); // Join the HTML strings into one string

        // Append the created media card
        document.querySelector(".photographer-media-section").innerHTML = mediaCardHTML;
    } catch (error) {
        console.error('Error in photographerHeader function', error);
    }
}

// Usage example
photographerHeader();


// Function for media card element
function createMediaCard(photographer, media, index) {
    if (media.image) {
        return `
            <figure class="photo-media">
                <img src="../../assets/portofolio/${photographer.name}/${media.image}" alt="${media.title}" tabindex="0" />
                <figcaption class="info">
                    <h2>${media.title}</h2>
                    <p class="likes" id="likes-${index}">
                        <span class="span_likes">${media.likes}</span>
                        <button class="heart-button liked" data-index="${index}">
                            <span>
                                <img src="assets/icons/coeur.svg" alt="coeur">
                            </span>
                        </button>
                    </p>
                </figcaption>
            </figure>
        `;
    } else if (media.video) {
        return `
            <figure class="video-media">
                <video src="../../assets/portofolio/${photographer.name}/${media.video}" class="video" controls autoplay tabindex="0"></video>
                <figcaption class="info">
                    <h2>${media.title}</h2>
                    <p class="likes" id="likes-${index}">
                        <span class="span_likes">${media.likes}</span>
                        <button class="heart-button liked" data-index="${index}">
                            <span>
                                <img src="assets/icons/coeur.svg" alt="coeur">
                            </span>
                        </button>
                    </p>
                </figcaption>
            </figure>
        `;
    }
}


// const photographer = getPhotographerById();
// const media = getMediaByPhotographerId();

// media.forEach((mediaItem, index) => {
//     const mediaCardHTML = createMediaCard(photographer, mediaItem, index);
//     // Append the created media card
//     document.querySelector(".photographer-media-section").innerHTML += mediaCardHTML;
// });
