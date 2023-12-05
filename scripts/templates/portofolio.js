export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
    }

    createPhotographerMedias() {

        const profilePageContent = document.querySelector(".portofolio");

        // Create the main section element
        const gallerySection = document.createElement("section");
        gallerySection.classList.add("gallery");

        // Iterate through the medias and create gallery cards
        this.medias.forEach(media => {
            // Create article element
            const mediaCard = document.createElement("article");
            mediaCard.classList.add("gallery_card");

            // Create link element
            const linkElement = document.createElement("a");
            linkElement.href = "#";
            linkElement.dataset.media = media.id;
            linkElement.setAttribute("role", "link");
            linkElement.setAttribute("aria-label", "View media large");

            // Create figure element
            const figureElement = document.createElement("figure");

            // Create either an image or video element based on media type
            const mediaContent = media.image ?
                document.createElement("img") :
                document.createElement("video");

            mediaContent.classList.add("gallery_thumbnail");

            if (media.image) {
                mediaContent.src = `./assets/photographers/portofolio/${this.photographer.name}/${media.image}`;
                mediaContent.alt = media.title;
            } else {
                mediaContent.src = `./assets/photographers/portofolio/${this.photographer.name}/${media.video}`;
                mediaContent.type = "video/mp4";
                mediaContent.setAttribute("aria-label", media.title);
            }

            // Create figcaption element
            const figcaptionElement = document.createElement("figcaption");

            // Create h2 element
            const h2Element = document.createElement("h2");
            h2Element.textContent = media.title;

            // Create div element for likes
            const likesContainer = document.createElement("div");
            likesContainer.setAttribute("role", "group");
            likesContainer.setAttribute("aria-label", "Like button and number of likes");

            // Create span element for number of likes
            const nbLikeElement = document.createElement("span");
            nbLikeElement.classList.add("nbLike");
            nbLikeElement.textContent = media.likes;

            // Create like button element
            const likeButton = document.createElement("button");
            likeButton.classList.add("btn_like");
            likeButton.setAttribute("type", "button");
            likeButton.setAttribute("aria-label", "Like");
            likeButton.dataset.id = media.id;

            // Create heart icon element
            const heartIcon = document.createElement("span");
            heartIcon.classList.add("fas", "fa-heart");
            heartIcon.setAttribute("aria-hidden", "true");

            // Append elements to their respective containers
            likeButton.appendChild(heartIcon);
            likesContainer.appendChild(nbLikeElement);
            likesContainer.appendChild(likeButton);
            figcaptionElement.appendChild(h2Element);
            figcaptionElement.appendChild(likesContainer);
            figureElement.appendChild(mediaContent);
            linkElement.appendChild(figureElement);
            mediaCard.appendChild(linkElement);
            mediaCard.appendChild(figcaptionElement);

            // Append the media card to the gallery section
            gallerySection.appendChild(mediaCard);
        });

        // Create the aside element
        const asideElement = document.createElement("aside");

        // Create the photographer likes paragraph
        const photographerLikesParagraph = document.createElement("p");
        photographerLikesParagraph.classList.add("photographer_likes");

        // Create span element for photographer likes count
        const photographerLikesCount = document.createElement("span");
        photographerLikesCount.classList.add("photographer_likes_count");

        // Create heart icon element for aside
        const heartIconAside = document.createElement("span");
        heartIconAside.classList.add("fas", "fa-heart");
        heartIconAside.setAttribute("aria-hidden", "true");

        // Append elements to the aside container
        photographerLikesParagraph.appendChild(photographerLikesCount);
        photographerLikesParagraph.appendChild(heartIconAside);
        asideElement.appendChild(photographerLikesParagraph);

        // Create span element for price
        const priceSpan = document.createElement("span");
        priceSpan.textContent = `${this.photographer.price}€ / jour`;
        asideElement.appendChild(priceSpan);

        // Append the main section and aside to the profile page content
        // gallerySection.appendChild(asideElement);
        profilePageContent.appendChild(gallerySection);
        profilePageContent.appendChild(asideElement);
        // Set photographer name in the form
        const formName = document.querySelector(".modal_form_name");
        formName.textContent = this.photographer.name;

    }
}