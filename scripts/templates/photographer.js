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

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement('article');
//         const artistCard = `
//             <a href="photographer.html?id=${id}" role="link" aria-label="View profile of ${name}">
//                 <img class="photographer_image" src="${picture}" alt="${name}">
//             </a>

//             <div class="photographer_details">
//                 <h2 class="photographer_name">${name}</h2>
//                 <h3 class="photographer_location">${city}, ${country}</h3>
//                 <p class="photographer_tagline">${tagline}</p>
//                 <p class="photographer_price">${price}€/jour</p>
//             </div>`;

//         article.innerHTML = artistCard;
//         return (article);
//     }
//     return {
//         name,
//         picture,
//         getUserCardDOM
//     }
// }



// function photographerTemplate(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }



const picture = `assets/photographers/${portrait}`;

function getUserCardDOM() {
    const article = document.createElement('article');

    const link = document.createElement('a');
    link.href = `photographer.html?id=${id}`;
    link.setAttribute('role', 'link');
    link.setAttribute('aria-label', `View profile of ${name}`);

    const img = document.createElement('img');
    img.classList.add('photographer_image');
    img.src = picture;
    img.alt = name;

    link.appendChild(img);
    article.appendChild(link);

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('photographer_details');

    const nameHeading = document.createElement('h2');
    nameHeading.classList.add('photographer_name');
    nameHeading.textContent = name;

    const locationHeading = document.createElement('h3');
    locationHeading.classList.add('photographer_location');
    locationHeading.textContent = `${city}, ${country}`;

    const taglineParagraph = document.createElement('p');
    taglineParagraph.classList.add('photographer_tagline');
    taglineParagraph.textContent = tagline;

    const priceParagraph = document.createElement('p');
    priceParagraph.classList.add('photographer_price');
    priceParagraph.textContent = `${price}€/jour`;

    detailsDiv.appendChild(nameHeading);
    detailsDiv.appendChild(locationHeading);
    detailsDiv.appendChild(taglineParagraph);
    detailsDiv.appendChild(priceParagraph);

    article.appendChild(detailsDiv);

    return article;
}

return {
    name,
    picture,
    getUserCardDOM
}
}