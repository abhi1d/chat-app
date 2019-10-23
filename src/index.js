const path = require('path')
const http = require('http')
const express = require('express')
const hbs = require('hbs')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')


const app = express()
const server = http.createServer(app)
const io= socketio(server)


const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

let count = 0
io.on('connection', (socket) => {
    console.log('New Web socket connection.')

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user joined'))

    socket.on('sendMessage', (msg, callback) => {
        const filtr = new Filter()
        
        if(filtr.isProfane(msg)) {
            return callback('Profanity is not allowed')
        }
        

        io.emit('message', generateMessage(msg))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

