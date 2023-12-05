/**
 * Représente un template pour la création de la section des médias d'un photographe sur la page de profil.
 */
export default class PhotographerMedias {
  /**
   * Initialise une nouvelle instance du template avec les données du photographe et les médias associés.
   * @param {Object} photographer - Les données du photographe.
   * @param {Object[]} medias - Les données des médias associés au photographe.
   * @param {number} medias.id - L'identifiant unique du média.
   * @param {string} medias.title - Le titre du média.
   * @param {string} medias.image - Le chemin vers l'image du média.
   * @param {string} medias.video - Le chemin vers la vidéo du média.
   * @param {number} medias.likes - Le nombre de "likes" du média.
   */
  constructor (photographer, medias) {
    this.photographer = photographer
    this.medias = medias
  }

  /**
   * Crée et affiche la section des médias du photographe sur la page de profil.
   * @returns {void}
   */
  createPhotographerMedias () {
    const profilePageContent = document.querySelector('.portofolio')

    // Crée l'élément principal de la section
    const gallerySection = document.createElement('section')
    gallerySection.classList.add('gallery')

    // Itère sur les médias et crée des cartes pour la galerie
    this.medias.forEach(media => {
      // Crée l'élément article
      const mediaCard = document.createElement('article')
      mediaCard.classList.add('gallery_card')

      // Crée l'élément lien
      const linkElement = document.createElement('a')
      linkElement.href = '#'
      linkElement.dataset.media = media.id
      linkElement.setAttribute('role', 'link')
      linkElement.setAttribute('aria-label', 'Voir le média en grand')

      // Crée l'élément figure
      const figureElement = document.createElement('figure')

      // Crée soit un élément image, soit vidéo en fonction du type de média
      const mediaContent = media.image
        ? document.createElement('img')
        : document.createElement('video')

      mediaContent.classList.add('gallery_thumbnail')

      if (media.image) {
        mediaContent.src = `./assets/photographers/portofolio/${this.photographer.name}/${media.image}`
        mediaContent.alt = media.title
      } else {
        mediaContent.src = `./assets/photographers/portofolio/${this.photographer.name}/${media.video}`
        mediaContent.type = 'video/mp4'
        mediaContent.setAttribute('aria-label', media.title)
      }

      // Crée l'élément figcaption
      const figcaptionElement = document.createElement('figcaption')

      // Crée l'élément h2
      const h2Element = document.createElement('h2')
      h2Element.textContent = media.title

      // Crée l'élément div pour les "likes"
      const likesContainer = document.createElement('div')
      likesContainer.setAttribute('role', 'group')
      likesContainer.setAttribute('aria-label', 'Bouton "Like" et nombre de "likes"')

      // Crée l'élément span pour le nombre de "likes"
      const nbLikeElement = document.createElement('span')
      nbLikeElement.classList.add('nbLike')
      nbLikeElement.textContent = media.likes

      // Crée le bouton "Like"
      const likeButton = document.createElement('button')
      likeButton.classList.add('btn_like')
      likeButton.setAttribute('type', 'button')
      likeButton.setAttribute('aria-label', 'Like')
      likeButton.dataset.id = media.id

      // Crée l'icône de cœur
      const heartIcon = document.createElement('span')
      heartIcon.classList.add('fas', 'fa-heart')
      heartIcon.setAttribute('aria-hidden', 'true')

      // Ajoute les éléments à leurs conteneurs respectifs
      likeButton.appendChild(heartIcon)
      likesContainer.appendChild(nbLikeElement)
      likesContainer.appendChild(likeButton)
      figcaptionElement.appendChild(h2Element)
      figcaptionElement.appendChild(likesContainer)
      figureElement.appendChild(mediaContent)
      linkElement.appendChild(figureElement)
      mediaCard.appendChild(linkElement)
      mediaCard.appendChild(figcaptionElement)

      // Ajoute la carte média à la section de la galerie
      gallerySection.appendChild(mediaCard)
    })

    // Crée l'élément aside
    const asideElement = document.createElement('aside')

    // Crée le paragraphe des "likes" du photographe
    const photographerLikesParagraph = document.createElement('p')
    photographerLikesParagraph.classList.add('photographer_likes')

    // Crée l'élément span pour le nombre de "likes" du photographe
    const photographerLikesCount = document.createElement('span')
    photographerLikesCount.classList.add('photographer_likes_count')

    // Crée l'icône de cœur pour l'élément aside
    const heartIconAside = document.createElement('span')
    heartIconAside.classList.add('fas', 'fa-heart')
    heartIconAside.setAttribute('aria-hidden', 'true')

    // Ajoute les éléments au conteneur de l'aside
    photographerLikesParagraph.appendChild(photographerLikesCount)
    photographerLikesParagraph.appendChild(heartIconAside)
    asideElement.appendChild(photographerLikesParagraph)

    // Crée l'élément span pour le prix
    const priceSpan = document.createElement('span')
    priceSpan.textContent = `${this.photographer.price}€ / jour`
    asideElement.appendChild(priceSpan)

    // Ajoute la section principale et l'aside au contenu de la page de profil
    profilePageContent.appendChild(gallerySection)
    profilePageContent.appendChild(asideElement)

    // Définit le nom du photographe dans le formulaire
    const formName = document.querySelector('.modal_form_name')
    formName.textContent = this.photographer.name
  }
}
