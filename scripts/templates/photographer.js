function photographerTemplate(data) {
    const {
        id,
        name,
        portrait,
        city,
        country,
        tagline,
        price
    } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const artistCard = `
            <a href="photographer.html?id=${id}" role="link" aria-label="View profile of ${name}">
                <img class="photographer_image" src="${picture}" alt="${name}">
            </a>

            <div class="photographer_details">
                <h2 class="photographer_name">${name}</h2>
                <h3 class="photographer_location">${city}, ${country}</h3>
                <p class="photographer_tagline">${tagline}</p>
                <p class="photographer_price">${price}€/jour</p>
            </div>`;

        article.innerHTML = artistCard;
        return (article);
    }
    return {
        name,
        picture,
        getUserCardDOM
    }
}


