export default class PhotographerTemplate {
    constructor(photographer) {
        this.photographer = photographer;
    }

    getUserCardDOM() {
        // Create article element
        const article = document.createElement('article');
        

        // Create link element
        const linkElement = document.createElement('a');
        linkElement.href = `photographer.html?id=${this.photographer.id}`;
        linkElement.setAttribute('role', 'link');
        linkElement.setAttribute('aria-label', `View the profile of ${this.photographer.name}`);

        // Create image element
        const imgElement = document.createElement('img');
        imgElement.classList.add('photographer_thumbnail');
        imgElement.src = `./assets/photographers/small_format/${this.photographer.portrait}`;
        imgElement.alt = this.photographer.name;

        // Create h2 element
        const h2Element = document.createElement('h2');
        h2Element.classList.add('photographer_name');
        h2Element.textContent = this.photographer.name;

        // Append image and h2 to the link
        linkElement.appendChild(imgElement);
        linkElement.appendChild(h2Element);

        // Create paragraphs
        const locationParagraph = document.createElement('p');
        locationParagraph.classList.add('photographer_location');
        locationParagraph.textContent = `${this.photographer.city}, ${this.photographer.country}`;

        const taglineParagraph = document.createElement('p');
        taglineParagraph.classList.add('photographer_tagline');
        taglineParagraph.textContent = this.photographer.tagline;

        // Create span for price
        const priceSpan = document.createElement('span');
        priceSpan.classList.add('photographer_price');
        priceSpan.textContent = `${this.photographer.price}€/day`;

        // Append link, paragraphs, and span to the article
        article.appendChild(linkElement);
        article.appendChild(locationParagraph);
        article.appendChild(taglineParagraph);
        article.appendChild(priceSpan);

        return article;
    }
}