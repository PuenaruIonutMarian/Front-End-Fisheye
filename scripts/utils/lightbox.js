/**
 * Affiche la lightbox pour visualiser les médias en détail.
 * @param {Object} medias - Les médias à afficher dans la lightbox.
 * @param {Object} medias.photographer - Les informations sur le photographe.
 * @param {Array} medias.medias - La liste des médias du photographe.
 * @returns {void}
 */
export const displayLightbox = medias => {
  // Sélectionne les éléments de la lightbox.
  const lightboxWrapper = document.querySelector('.lightbox_wrapper')
  const btnClose = document.querySelector('.btn_close_lightbox')
  const btnPrevious = document.querySelector('.btn_previous')
  const btnNext = document.querySelector('.btn_next')
  const lightboxMedia = document.querySelector('.lightbox_media')
  const mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'))

  // Récupère les informations sur le photographe et la liste des médias.
  const photographer = medias.photographer
  const mediasList = medias.medias

  // Initialize currentIndex to 0
  let currentIndex = 0

  // Ajoute un écouteur d'événement à chaque élément de fournisseur de médias.
  mediaProvider.forEach((media, index) => {
    media.addEventListener('click', () => {
      openLightbox(index)
    })
  })

  /**
   * Génère le contenu de la lightbox en fonction de l'élément actuel.
   * @returns {void}
   */
  const lightboxTemplate = () => {
    // Récupère le média actuel.
    const currentMedia = mediasList[currentIndex]

    // Crée l'élément image ou vidéo en fonction du type de média.
    const mediaElement = currentMedia.image
      ? createImageElement(currentMedia)
      : createVideoElement(currentMedia)

    // Efface le contenu existant dans lightboxMedia.
    lightboxMedia.innerHTML = ''

    // Ajoute l'élément média et la légende à lightboxMedia.
    lightboxMedia.appendChild(mediaElement)
    lightboxMedia.appendChild(createFigcaptionElement(currentMedia.title))
  }

  /**
   * Fonction pour ouvrir la lightbox en fonction de l'identifiant du média.
   * @param {string} mediaId - L'identifiant du média.
   * @returns {void}
   */
  const openLightbox = (index) => {
    currentIndex = index
    lightboxWrapper.style.display = 'flex'
    btnClose.focus()
    lightboxTemplate()
    lightboxWrapper.setAttribute('aria-label', 'Details Media: ' + mediasList[index].title)
  }

  /**
   * Crée un élément image.
   * @param {Object} media - Les informations sur le média image.
   * @returns {HTMLImageElement} - L'élément image créé.
   */
  const createImageElement = (media) => {
    const imageElement = document.createElement('img')
    imageElement.src = `./assets/photographers/portofolio/${photographer.name}/${media.image}`
    imageElement.alt = media.alt
    return imageElement
  }

  /**
   * Crée un élément vidéo.
   * @param {Object} media - Les informations sur le média vidéo.
   * @returns {HTMLVideoElement} - L'élément vidéo créé.
   */
  const createVideoElement = (media) => {
    const videoElement = document.createElement('video')
    videoElement.controls = true
    videoElement.setAttribute('aria-label', media.alt)

    const sourceElement = document.createElement('source')
    sourceElement.src = `./assets/photographers/portofolio/${photographer.name}/${media.video}`
    sourceElement.type = 'video/mp4'

    videoElement.appendChild(sourceElement)
    return videoElement
  }

  /**
   * Crée un élément figcaption.
   * @param {string} title - Le titre du média.
   * @returns {HTMLFigcaptionElement} - L'élément figcaption créé.
   */
  const createFigcaptionElement = (title) => {
    const figcaptionElement = document.createElement('figcaption')
    figcaptionElement.textContent = title
    return figcaptionElement
  }

  // Fonction pour fermer la lightbox.
  const closeLightbox = () => {
    lightboxWrapper.style.display = 'none'
    lightboxMedia.innerHTML = ''
  }

  // Fonction pour passer au média suivant.
  const nextMedia = () => {
    currentIndex++
    if (currentIndex > mediasList.length - 1) currentIndex = 0
    lightboxTemplate()
    showActiveBtn(btnNext)
  }

  // Fonction pour passer au média précédent.
  const previousMedia = () => {
    currentIndex--
    if (currentIndex < 0) currentIndex = mediasList.length - 1
    lightboxTemplate()
    showActiveBtn(btnPrevious)
  }

  /**
   * Affiche brièvement l'état actif d'un bouton.
   * @param {HTMLElement} btn - Le bouton à mettre en surbrillance.
   * @returns {void}
   */
  const showActiveBtn = (btn) => {
    btn.classList.add('active')
    setTimeout(() => btn.classList.remove('active'), 100)
  }

  // Ajoute des écouteurs d'événements pour les touches du clavier.
  document.addEventListener('keyup', e => {
    switch (e.key) {
      case 'Escape':
        closeLightbox()
        break
      case 'ArrowLeft':
        previousMedia()
        break
      case 'ArrowRight':
        nextMedia()
        break
    }
  })

  // Ajoute des écouteurs d'événements pour les boutons de navigation.
  btnPrevious.addEventListener('click', () => previousMedia())
  btnNext.addEventListener('click', () => nextMedia())
  btnClose.addEventListener('click', () => closeLightbox())
}
