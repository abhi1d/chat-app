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

} )
