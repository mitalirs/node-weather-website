

fetch('http://puzzle.mead.io/puzzle').then((response) =>{
    response.json().then((data) =>{
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?address=!').then((response)=>{
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.innerHTML = 'Loading...'
    messageTwo.innerHTML = ''
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data) => {
            if(data.error) {
                messageOne.innerHTML = data.error
            } else {
                messageOne.innerHTML = (data.location)
                messageTwo.innerHTML = (data.forecast)
            }
        })
    })
})
