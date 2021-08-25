const weatherForm  = document.querySelector('form')
const search       = document.querySelector('input')
const messageOne   = document.querySelector('#message-1')
const messageTwo   = document.querySelector('#message-2')
const messageError = document.querySelector('#messageError')

// Event listenter for submiting a form with a 
// callback function that runs everytime the form is submitted
weatherForm.addEventListener('submit', (e) => {
  // Prevent the default behaviour of refreshing the page
  e.preventDefault()

  const location = search.value
  messageOne.textContent = 'Loading the forecast...'
  messageTwo.textContent = ''
  messageError.textContent = ''

  // Weather fetch API
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageError.textContent= data.error
        messageOne.textContent = ''
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
      }
    })
  })
})