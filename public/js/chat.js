const socket = io() 

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) =>{
    e.preventDefault()
    const msg = e.target.elements.message
    const messageSection = document.querySelector('#msgs')
    messageSection.textContent = msg.value
    socket.emit('sendMessage', msg.value)

})

document.querySelector('#send-location').addEventListener('click' , () => {
   if ( !navigator.geolocation ) {
        return alert('Geolocation is not supported y your browser. ')

   } 

   navigator.geolocation.getCurrentPosition(  (position) => {
     socket.emit('sendLocation', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    })
   })
})
