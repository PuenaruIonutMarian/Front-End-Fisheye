export default class PhotographerHeader {
    constructor(photographer) {
        this.photographer = photographer;
    }

    createPhotographerHeader() {
        const profilePageHeader = document.querySelector(".main_about");

        // Set photographer name in the form
        const formName = document.querySelector(".modal_form_name");
        formName.textContent = this.photographer.name;

        // Set meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = `Discover ${this.photographer.name}, a professional photographer based in ${this.photographer.city}, ${this.photographer.country} offering services starting at ${this.photographer.price} € / day.`;
        }

        // Create photographer profile info div
        const profileInfoDiv = document.createElement('div');
        profileInfoDiv.classList.add('photographer_profile__infos');

        // Create h1 element for photographer name
        const h1Element = document.createElement('h1');
        h1Element.classList.add('photographer_name');
        h1Element.textContent = this.photographer.name;

        // Create paragraph element for location
        const locationParagraph = document.createElement('p');
        locationParagraph.classList.add('photographer_location');
        locationParagraph.textContent = `${this.photographer.city}, ${this.photographer.country}`;

        // Create paragraph element for tagline
        const taglineParagraph = document.createElement('p');
        taglineParagraph.classList.add('photographer_tagline');
        taglineParagraph.textContent = this.photographer.tagline;

        // Append h1 and paragraphs to the profile info div
        profileInfoDiv.appendChild(h1Element);
        profileInfoDiv.appendChild(locationParagraph);
        profileInfoDiv.appendChild(taglineParagraph);

        // Create button for contact
        const contactButton = document.createElement('button');
        contactButton.classList.add('btn', 'btn_cta');
        contactButton.setAttribute('type', 'button');
        contactButton.setAttribute('aria-label', 'Open contact form');
        contactButton.textContent = 'Contactez-moi';

        // Create image element for photographer thumbnail
        const imgElement = document.createElement('img');
        imgElement.classList.add('photographer_thumbnail');
        imgElement.src = `./assets/photographers/small_format/${this.photographer.portrait}`;
        imgElement.alt = this.photographer.name;

        // Append profile info div, button, and image to the profile page header
        profilePageHeader.innerHTML = '';
        profilePageHeader.appendChild(profileInfoDiv);
        profilePageHeader.appendChild(contactButton);
        profilePageHeader.appendChild(imgElement);

        return profilePageHeader.innerHTML;
    }
}
