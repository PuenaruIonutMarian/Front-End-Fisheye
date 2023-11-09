function photographerTemplate(data) {
    const {
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
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;

        const divDetails = document.createElement('div');
        

        const h3 = document.createElement('h3');
        h3.textContent = `${city}, ${country}`;

        const paragraphTagline = document.createElement('p');
        paragraphTagline.textContent = tagline;

        const paragraphPrice = document.createElement('p');
        paragraphPrice.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(divDetails);
        divDetails.appendChild(h3);
        divDetails.appendChild(paragraphTagline);
        divDetails.appendChild(paragraphPrice);
        return (article);
    }
    return {
        name,
        picture,
        getUserCardDOM
    }
}