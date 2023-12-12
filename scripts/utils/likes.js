/**
 * Affiche le total des mentions J'aime pour un photographe et gère les mentions J'aime individuelles pour chaque média.
 * @param {Object} photographer - Informations sur le photographe.
 * @param {Array} medias - Tableau d'objets médias.
 */
export const displayTotalLikes = (photographer, medias) => {
  // Sélectionne tous les boutons "Like" et l'élément total des mentions Like
  const allBtnLike = document.querySelectorAll('.btn_like')
  const likesElement = document.querySelector('.photographer_likes_count')

  /**
   * Met à jour le nombre total de mentions J'aime en fonction du tableau actuel des médias.
   * @param {Array} medias - Tableau d'objets médias.
   */
  const updateTotalLikes = (medias) => {
    // Vérifie si medias est défini avant d'utiliser reduce
    const totalLikes = medias ? medias.reduce((acc, media) => acc + media.likes, 0) : 0
    likesElement.textContent = `${totalLikes}`
  }

  // Met à jour le total des mentions Like initialement
  updateTotalLikes(medias)

  // Ajoute des écouteurs d'événements de clic à tous les boutons "Like"
  allBtnLike.forEach(btn => {
    btn.addEventListener('click', () => {
      // Vérifie si medias est défini avant d'utiliser find
      // eslint-disable-next-line eqeqeq
      const media = medias && medias.find(media => media.id == btn.dataset.id)

      if (!media) {
        console.error('Media not found for ID:', btn.dataset.id)
        return
      }

      // Incrémente ou décrémente le nombre de mentions J'aime en fonction de l'état du bouton.
      if (!btn.classList.contains('liked')) {
        media.likes++
      } else {
        media.likes--
      }

      // Bascule la classe 'liked' du bouton.
      btn.classList.toggle('liked')

      // Met à jour le nombre de mentions J'aime affiché à côté du bouton.
      const likesElement = btn.previousElementSibling
      likesElement.textContent = `${media.likes}`

      // Passe directement le tableau des médias à updateTotalLikes
      updateTotalLikes([...medias])
    })
  })
}

/**
 * Ajoute des écouteurs d'événements de clic à tous les boutons "J'aime".
 * @param {Object} photographer - Informations sur le photographe.
 * @param {Array} medias - Tableau d'objets médias.
 */
export const addLikeButtonEventListeners = (photographer, medias) => {
  const allBtnLike = document.querySelectorAll('.btn_like')

  allBtnLike.forEach((btn) => {
    btn.addEventListener('click', () => {
      // eslint-disable-next-line eqeqeq
      const media = medias.find((media) => media.id == btn.dataset.id)

      if (!media) {
        console.error('Media not found for ID:', btn.dataset.id)
        return
      }

      if (!btn.classList.contains('liked')) {
        media.likes++
      } else {
        media.likes--
      }

      btn.classList.toggle('liked')

      const likesElement = btn.previousElementSibling
      likesElement.textContent = `${media.likes}`

      // Met à jour le total des mentions Like
      displayTotalLikes(photographer, medias)
    })
  })
}
