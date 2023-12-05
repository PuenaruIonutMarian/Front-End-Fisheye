/**
 * Affiche la fenêtre modale de contact.
 */
// eslint-disable-next-line no-unused-vars
function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'
}

/**
 * Ferme la fenêtre modale de contact.
 */
function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
}

/**
 * Valide le formulaire de contact.
 */
// eslint-disable-next-line no-unused-vars
const validateForm = () => {
  const form = document.querySelector('.modal form')
  const firstName = document.querySelector('#firstname')
  const lastName = document.querySelector('#lastname')
  const email = document.querySelector('#email')
  const message = document.querySelector('#message')

  form.addEventListener('input', () => displayCustomMessage())

  form.addEventListener('submit', e => {
    e.preventDefault()
    if (!form.checkValidity()) displayCustomMessage()
    else {
      const formDatas = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value
      }
      console.log(JSON.stringify(formDatas))
      document.querySelectorAll('.formField').forEach(input => input.classList.remove('valid'))
      form.reset()
      closeModal()
    }
  })

  /**
   * Vérifie la validité d'un champ de formulaire en utilisant une expression régulière.
   * @param {HTMLInputElement} input - L'élément de champ de formulaire.
   * @param {RegExp} regex - L'expression régulière pour la validation.
   * @returns {void}
   */
  const checkInputValidity = (input, regex) => {
    const errorMessage = input.dataset.error
    const messageProvider = input.nextElementSibling
    const isValid = regex.test(input.value)

    if (isValid) {
      messageProvider.innerHTML = ''
      messageProvider.removeAttribute('role')
      input.removeAttribute('aria-invalid')
    } else {
      messageProvider.innerHTML = errorMessage
      messageProvider.setAttribute('role', 'alert')
      input.setAttribute('aria-invalid', 'true')
    }

    input.classList.toggle('invalid', !isValid)
    input.classList.toggle('valid', isValid)
  }

  /**
   * Affiche un message personnalisé basé sur la validité des champs du formulaire.
   * @returns {void}
   */
  const displayCustomMessage = () => {
    const regexName = /^[A-Za-z-]{2,}$/
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    const regexMessage = /^[A-Za-z0-9|\s]{5,200}$/

    checkInputValidity(firstName, regexName)
    checkInputValidity(lastName, regexName)
    checkInputValidity(email, regexEmail)
    checkInputValidity(message, regexMessage)
  }
}
