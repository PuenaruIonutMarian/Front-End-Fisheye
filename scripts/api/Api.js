/**
 * Classe représentant une API.
 */
export default class Api {
  /**
     * Crée une instance de l'objet Api.
     * @param {string} url - L'URL de l'API / location fichier json.
     */
  constructor (url) {
    this.url = url
  }

  /**
     * Effectue une requête GET à l'URL spécifiée.
     * @returns {Promise} Une promesse contenant les données JSON de la réponse.
     * @throws {Error} Lance une erreur en cas d'échec de la requête ou de l'analyse JSON.
     */
  async get () {
    try {
      // Utiliser l'API Fetch pour recuperer les donnes
      const response = await fetch(this.url)

      // Analyser le  réponse  et renvoyer le résultat
      return await response.json()
    } catch (err) {
      // Si une erreur , lancer l' erreur
      throw new Error(err)
    }
  }
}
