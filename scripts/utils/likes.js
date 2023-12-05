import { getPhotographerById } from '../pages/photographer.js'

/**
 * Affiche le nombre total de likes pour le photographe.
 * @async
 * @returns {void}
 */
export const displayTotalLikes = async () => {
  // Récupère les médias du photographe par son identifiant.
  const { medias } = await getPhotographerById()

  // Sélectionne tous les boutons de like.
  const allBtnLike = document.querySelectorAll('.btn_like')

  // Sélectionne l'élément affichant le nombre total de likes.
  const likesElement = document.querySelector('.photographer_likes_count')

  /**
   * Met à jour le nombre total de likes affiché.
   * @returns {void}
   */
  const updateTotalLikes = () => {
    // Calcule le total des likes en utilisant la fonction de réduction (reduce).
    const totalLikes = medias.reduce((acc, media) => acc + media.likes, 0)
    likesElement.textContent = `${totalLikes}`
  }

  // Appelle la fonction pour mettre à jour le nombre total de likes.
  updateTotalLikes()

  // Ajoute un écouteur d'événement à chaque bouton de like.
  allBtnLike.forEach(btn => {
    btn.addEventListener('click', () => {
      // Trouve le média correspondant à l'identifiant du bouton de like.
      // eslint-disable-next-line eqeqeq
      const media = medias.find(media => media.id == btn.dataset.id)

      // Incrémente ou décrémente le nombre de likes en fonction de l'état du bouton.
      if (!btn.classList.contains('liked')) {
        media.likes++
      } else {
        media.likes--
      }

      // Bascule la classe 'liked' du bouton.
      btn.classList.toggle('liked')

      // Met à jour le texte de l'élément affichant le nombre de likes du média.
      const likesElement = btn.previousElementSibling
      likesElement.textContent = `${media.likes}`

      // Met à jour le nombre total de likes.
      updateTotalLikes()
    })
  })
}
